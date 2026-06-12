import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HashingServiceProtocol } from '../autenticacao/hash/hashing.service';
import { CreatImagensProdutoDTO } from './dto/creat-imagem.dto';

@Injectable()
export class ImagensProdutoService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly hashingService: HashingServiceProtocol
    ) { }

    async list_all() {
        const allImagensProduto = await this.prismaService.imagens_produto.findMany()
        return allImagensProduto;
    }

    async create(createImagensProdutoDTO: CreatImagensProdutoDTO, produtoId: number,tokenPayload) {
        const produto= await this.prismaService.produtos.findFirst({
            where:{
                id:produtoId,
                loja:{
                    usuarioId: tokenPayload.sub
                }
            }
        })
        
        if(!produto){
            throw new HttpException("Usuario n autorizado", HttpStatus.FORBIDDEN)
        }
        const newImagensProduto = await this.prismaService.imagens_produto.create({
            data: {
                url_imagem: createImagensProdutoDTO.url_imagem,
                produto_id: produtoId,
                ordem: createImagensProdutoDTO.ordem
            }
        })
        return newImagensProduto;
    }

    async getImagensByProdutoId(produtoId: number) {
        const imagensProduto = await this.prismaService.imagens_produto.findMany({
            where: {
                produto_id: produtoId
            }
        })
        return imagensProduto;
    }

    async update(id: number, updateImagensProdutoDTO: CreatImagensProdutoDTO, tokenPayload) {
        const ImagemProduto= await this.prismaService.imagens_produto.findFirst({
            where:{
                id:id,
                produto:{
                    loja:{
                        usuarioId: tokenPayload.sub
                    }
                }
            }
        })
        if(!ImagemProduto){
            throw new HttpException("Usuario n autorizado", HttpStatus.FORBIDDEN)
        }
        const updatedImagensProduto = await this.prismaService.imagens_produto.update({
            where: {
                id: id
            },
            data: {
                url_imagem: updateImagensProdutoDTO.url_imagem,
                produto_id: id,
                ordem: updateImagensProdutoDTO.ordem
            }
        })
        return updatedImagensProduto;
    }

    async delete(id: number, tokenPayload) {
        const ImagemProduto= await this.prismaService.imagens_produto.findFirst({
            where:{
                id:id,
                produto:{
                    loja:{
                        usuarioId: tokenPayload.sub
                    }
                }
            }
        })
        if(!ImagemProduto){
            throw new HttpException("Usuario n autorizado", HttpStatus.FORBIDDEN)
        }
        await this.prismaService.imagens_produto.delete({
            where: {
                id: id
            }
        })
        return { message: 'Imagem do produto deletada com sucesso' };
    }

}
