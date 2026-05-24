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
      },
    });
    return allLojas;
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

    const deletedLoja = await this.prismaService.lojas.delete({
      where: {
        id: id,
      },
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
      },
    });

    return lojas;
  }
}
