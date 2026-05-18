import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDTO } from './dto/create-categoria.dto';
import { UpdateCategoriaDTO } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prismaService: PrismaService) {}

  async list_all() {
    const allCategorias = await this.prismaService.categorias.findMany({
      include: {
        subcategorias: true,
        categoria_pai: true,
      },
    });
    return allCategorias;
  }

  async getOneById(id: number) {
    const categoria = await this.prismaService.categorias.findFirst({
      where: {
        id: id,
      },
      include: {
        subcategorias: true,
        categoria_pai: true,
      },
    });

    if (!categoria) {
      throw new HttpException(
        'Categoria não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return categoria;
  }

  async create(createCategoriaDTO: CreateCategoriaDTO) {
    // Validar se categoria_pai existe caso seja fornecida
    if (createCategoriaDTO.categoria_pai_id) {
      const categoriaPai = await this.prismaService.categorias.findFirst({
        where: {
          id: createCategoriaDTO.categoria_pai_id,
        },
      });

      if (!categoriaPai) {
        throw new HttpException(
          'Categoria pai não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const newCategoria = await this.prismaService.categorias.create({
      data: {
        nome: createCategoriaDTO.nome,
        categoria_pai_id: createCategoriaDTO.categoria_pai_id,
      },
      include: {
        subcategorias: true,
        categoria_pai: true,
      },
    });

    return newCategoria;
  }

  async update(id: number, updateCategoriaDTO: UpdateCategoriaDTO) {
    // Validar se categoria existe
    const categoria = await this.prismaService.categorias.findFirst({
      where: {
        id: id,
      },
    });

    if (!categoria) {
      throw new HttpException(
        'Categoria não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    // Validar se categoria_pai existe caso seja fornecida
    if (
      updateCategoriaDTO.categoria_pai_id &&
      updateCategoriaDTO.categoria_pai_id !== id
    ) {
      const categoriaPai = await this.prismaService.categorias.findFirst({
        where: {
          id: updateCategoriaDTO.categoria_pai_id,
        },
      });

      if (!categoriaPai) {
        throw new HttpException(
          'Categoria pai não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const updatedCategoria = await this.prismaService.categorias.update({
      where: {
        id: id,
      },
      data: {
        nome: updateCategoriaDTO.nome,
        categoria_pai_id: updateCategoriaDTO.categoria_pai_id,
      },
      include: {
        subcategorias: true,
        categoria_pai: true,
      },
    });

    return updatedCategoria;
  }

  async delete(id: number) {
    // Validar se categoria existe
    const categoria = await this.prismaService.categorias.findFirst({
      where: {
        id: id,
      },
    });

    if (!categoria) {
      throw new HttpException(
        'Categoria não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    // Verificar se há subcategorias
    const temSubcategorias = await this.prismaService.categorias.findMany({
      where: {
        categoria_pai_id: id,
      },
    });

    if (temSubcategorias.length > 0) {
      throw new HttpException(
        'Não é possível deletar uma categoria que possui subcategorias',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verificar se há produtos
    const temProdutos = await this.prismaService.produtos.findMany({
      where: {
        categoria_id: id,
      },
    });

    if (temProdutos.length > 0) {
      throw new HttpException(
        'Não é possível deletar uma categoria que possui produtos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedCategoria = await this.prismaService.categorias.delete({
      where: {
        id: id,
      },
    });

    return deletedCategoria;
  }
}
