import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CategoriasService, PrismaService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
