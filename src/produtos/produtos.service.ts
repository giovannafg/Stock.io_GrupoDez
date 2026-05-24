import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDTO } from './dto/create-produto.dto';
import { UpdateProdutoDTO } from './dto/update-produto.dto';
import { PayloadTokenDto } from '../autenticacao/dto/payload-token.dto';

@Injectable()
export class ProdutosService {
  constructor(private prismaService: PrismaService) {}

  async list_all(search?: string, categoria_id?: number) {
    const where: any = {};

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { descricao: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoria_id) {
      where.categoria_id = categoria_id;
    }

    const allProdutos = await this.prismaService.produtos.findMany({
      where,
      include: {
        loja: true,
        categoria: true,
        imagens_produto: true,
        avaliacoes_produto: true,
      },
    });
    return allProdutos;
  }

  async getOneById(id: number) {
    const produto = await this.prismaService.produtos.findFirst({
      where: {
        id: id,
      },
      include: {
        loja: true,
        categoria: true,
        imagens_produto: true,
        avaliacoes_produto: true,
      },
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  async getProdutosByLojaId(loja_id: number) {
    const produtos = await this.prismaService.produtos.findMany({
      where: {
        loja_id: loja_id,
      },
      include: {
        loja: true,
        categoria: true,
        imagens_produto: true,
        avaliacoes_produto: true,
      },
    });

    return produtos;
  }

  async getProdutosByCategoriaId(categoria_id: number) {
    const produtos = await this.prismaService.produtos.findMany({
      where: {
        categoria_id: categoria_id,
      },
      include: {
        loja: true,
        categoria: true,
        imagens_produto: true,
        avaliacoes_produto: true,
      },
    });

    return produtos;
  }

  async create(
    createProdutoDTO: CreateProdutoDTO,
    tokenPayload: PayloadTokenDto,
  ) {
    // Validar se a loja existe
    const loja = await this.prismaService.lojas.findFirst({
      where: {
        id: createProdutoDTO.loja_id,
      },
    });

    if (!loja) {
      throw new HttpException('Loja não encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar se o usuário autenticado é o dono da loja
    if (loja.usuarioId !== tokenPayload.sub) {
      throw new HttpException(
        'Você não tem permissão para adicionar produtos a esta loja',
        HttpStatus.FORBIDDEN,
      );
    }

    // Validar se a categoria existe
    const categoria = await this.prismaService.categorias.findFirst({
      where: {
        id: createProdutoDTO.categoria_id,
      },
    });

    if (!categoria) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }

    // Criar o produto com imagens
    const newProduto = await this.prismaService.produtos.create({
      data: {
        loja_id: createProdutoDTO.loja_id,
        categoria_id: createProdutoDTO.categoria_id,
        nome: createProdutoDTO.nome,
        descricao: createProdutoDTO.descricao,
        preco: createProdutoDTO.preco,
        estoque: createProdutoDTO.estoque,
        imagens_produto:
          createProdutoDTO.imagens && createProdutoDTO.imagens.length > 0
            ? {
                create: createProdutoDTO.imagens.map((url, index) => ({
                  url_imagem: url,
                  ordem: index + 1,
                })),
              }
            : undefined,
      },
      include: {
        loja: true,
        categoria: true,
        imagens_produto: true,
        avaliacoes_produto: true,
      },
    });

    return newProduto;
  }

  async update(
    id: number,
    updateProdutoDTO: UpdateProdutoDTO,
    tokenPayload: PayloadTokenDto,
  ) {
    // Validar se o produto existe
    const produto = await this.prismaService.produtos.findFirst({
      where: {
        id: id,
      },
      include: {
        loja: true,
      },
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar se o usuário autenticado é o dono da loja
    if (produto.loja.usuarioId !== tokenPayload.sub) {
      throw new HttpException(
        'Você não tem permissão para editar este produto',
        HttpStatus.FORBIDDEN,
      );
    }

    // Validar categoria se fornecida
    if (updateProdutoDTO.categoria_id) {
      const categoria = await this.prismaService.categorias.findFirst({
        where: {
          id: updateProdutoDTO.categoria_id,
        },
      });

      if (!categoria) {
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    // Atualizar imagens se fornecidas
    if (updateProdutoDTO.imagens) {
      // Deletar imagens anteriores
      await this.prismaService.imagens_produto.deleteMany({
        where: {
          produto_id: id,
        },
      });

      // Criar novas imagens
      await this.prismaService.imagens_produto.createMany({
        data: updateProdutoDTO.imagens.map((url, index) => ({
          produto_id: id,
          url_imagem: url,
          ordem: index + 1,
        })),
      });
    }

    const updatedProduto = await this.prismaService.produtos.update({
      where: {
        id: id,
      },
      data: {
        nome: updateProdutoDTO.nome,
        descricao: updateProdutoDTO.descricao,
        preco: updateProdutoDTO.preco,
        estoque: updateProdutoDTO.estoque,
        categoria_id: updateProdutoDTO.categoria_id,
      },
      include: {
        loja: true,
        categoria: true,
        imagens_produto: true,
        avaliacoes_produto: true,
      },
    });

    return updatedProduto;
  }

  async delete(id: number, tokenPayload: PayloadTokenDto) {
    // Validar se o produto existe
    const produto = await this.prismaService.produtos.findFirst({
      where: {
        id: id,
      },
      include: {
        loja: true,
      },
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar se o usuário autenticado é o dono da loja
    if (produto.loja.usuarioId !== tokenPayload.sub) {
      throw new HttpException(
        'Você não tem permissão para deletar este produto',
        HttpStatus.FORBIDDEN,
      );
    }

    // Deletar imagens do produto
    await this.prismaService.imagens_produto.deleteMany({
      where: {
        produto_id: id,
      },
    });

    const deletedProduto = await this.prismaService.produtos.delete({
      where: {
        id: id,
      },
    });

    return deletedProduto;
  }
}
