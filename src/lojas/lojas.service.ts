import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLojaDTO } from './dto/create-loja.dto';
import { UpdateLojaDTO } from './dto/update-loja.dto';
import { PayloadTokenDto } from '../autenticacao/dto/payload-token.dto';

@Injectable()
export class LojasService {
  constructor(private prismaService: PrismaService) {}

  async list_all(search?: string) {
    const where: any = {};

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { descricao: { contains: search, mode: 'insensitive' } },
      ];
    }

    const allLojas = await this.prismaService.lojas.findMany({
      where,
      include: {
        usuario: true,
        produtos: true,
        categoria: true,
      },
    });

    return allLojas.map((loja) => ({
      id: loja.id,
      nome: loja.nome,
      categoria: loja.categoria?.nome || 'Sem categoria',
      descricao: loja.descricao,
      logo: loja.logo_url,
      banner_url: loja.banner_url,
      sticker_url: loja.sticker_url,
      usuarioId: loja.usuarioId,
    }));
  }

  async getOneById(id: number) {
    const loja = await this.prismaService.lojas.findFirst({
      where: {
        id: id,
      },
      include: {
        usuario: true,
        produtos: true,
        avaliacoes_loja: true,
      },
    });

    if (!loja) {
      throw new HttpException('Loja não encontrada', HttpStatus.NOT_FOUND);
    }

    return loja;
  }

  async create(createLojaDTO: CreateLojaDTO, tokenPayload: PayloadTokenDto) {
    // Validar se o usuário existe
    const usuario = await this.prismaService.usuarios.findFirst({
      where: {
        id: tokenPayload.sub,
      },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const newLoja = await this.prismaService.lojas.create({
      data: {
        nome: createLojaDTO.nome,
        categoria_id: createLojaDTO.categoria_id,
        descricao: createLojaDTO.descricao,
        logo_url: createLojaDTO.logo_url,
        banner_url: createLojaDTO.banner_url,
        sticker_url: createLojaDTO.sticker_url,
        usuarioId: tokenPayload.sub,
      },
      include: {
        usuario: true,
        produtos: true,
      },
    });

    return newLoja;
  }

  async getLojasByCategoria(categoria: string) {
    const lojas = await this.prismaService.lojas.findMany({
      where: {
        categoria: {
          nome: categoria,
        },
      },
      include: {
        usuario: true,
        produtos: true,
        categoria: true,
      },
    });

    return lojas.map((loja) => ({
      id: loja.id,
      nome: loja.nome,
      categoria: loja.categoria?.nome || 'Sem categoria',
      descricao: loja.descricao,
      logo: loja.logo_url,
      banner_url: loja.banner_url,
      sticker_url: loja.sticker_url,
      usuarioId: loja.usuarioId,
    }));
  }

  async update(
    id: number,
    updateLojaDTO: UpdateLojaDTO,
    tokenPayload: PayloadTokenDto,
  ) {
    // Validar se a loja existe
    const loja = await this.prismaService.lojas.findFirst({
      where: {
        id: id,
      },
    });

    if (!loja) {
      throw new HttpException('Loja não encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar se o usuário autenticado é o dono da loja
    if (loja.usuarioId !== tokenPayload.sub) {
      throw new HttpException(
        'Você não tem permissão para editar esta loja',
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedLoja = await this.prismaService.lojas.update({
      where: {
        id: id,
      },
      data: {
        nome: updateLojaDTO.nome,
        categoria_id: updateLojaDTO.categoria_id,
        descricao: updateLojaDTO.descricao,
        logo_url: updateLojaDTO.logo_url,
        banner_url: updateLojaDTO.banner_url,
        sticker_url: updateLojaDTO.sticker_url,
      },
      include: {
        usuario: true,
        produtos: true,
      },
    });

    return updatedLoja;
  }

  async delete(id: number, tokenPayload: PayloadTokenDto) {
    // Validar se a loja existe
    const loja = await this.prismaService.lojas.findFirst({
      where: {
        id: id,
      },
    });

    if (!loja) {
      throw new HttpException('Loja não encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar se o usuário autenticado é o dono da loja
    if (loja.usuarioId !== tokenPayload.sub) {
      throw new HttpException(
        'Você não tem permissão para deletar esta loja',
        HttpStatus.FORBIDDEN,
      );
    }

    const produtos = await this.prismaService.produtos.findMany({
      where: {
        loja_id: id,
      },
      select: {
        id: true,
      },
    });
    const produtoIds = produtos.map((produto) => produto.id);

    const avaliacoesLoja = await this.prismaService.avaliacoes_loja.findMany({
      where: {
        loja_id: id,
      },
      select: {
        id: true,
      },
    });
    const avaliacaoLojaIds = avaliacoesLoja.map((avaliacao) => avaliacao.id);

    const deletedLoja = await this.prismaService.$transaction(async (tx) => {
      if (avaliacaoLojaIds.length > 0) {
        await tx.comentarios_avaliacao.deleteMany({
          where: {
            avaliacao_loja_id: {
              in: avaliacaoLojaIds,
            },
          },
        });
      }

      if (produtoIds.length > 0) {
        await tx.comentarios_avaliacao.deleteMany({
          where: {
            avaliacao_produto_id: {
              in: produtoIds,
            },
          },
        });

        await tx.avaliacoes_produto.deleteMany({
          where: {
            produto_id: {
              in: produtoIds,
            },
          },
        });

        await tx.imagens_produto.deleteMany({
          where: {
            produto_id: {
              in: produtoIds,
            },
          },
        });

        await tx.produtos.deleteMany({
          where: {
            loja_id: id,
          },
        });
      }

      await tx.avaliacoes_loja.deleteMany({
        where: {
          loja_id: id,
        },
      });

      return tx.lojas.delete({
        where: {
          id: id,
        },
      });
    });

    return deletedLoja;
  }

  async getLojasByUserId(usuarioId: number) {
    const lojas = await this.prismaService.lojas.findMany({
      where: {
        usuarioId: usuarioId,
      },
      include: {
        usuario: true,
        produtos: true,
        categoria: true,
      },
    });

    return lojas.map((loja) => ({
      id: loja.id,
      nome: loja.nome,
      logo: loja.logo_url,
      categoria: loja.categoria?.nome || 'Sem categoria',
    }));
  }
}
