import { Module } from '@nestjs/common';
import { ImagensProdutoService } from './imagens-produto.service';
import { ImagensProdutoController } from './imagens-produto.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ImagensProdutoService, PrismaService],
  controllers: [ImagensProdutoController],
})
export class ImagensProdutoModule {}
