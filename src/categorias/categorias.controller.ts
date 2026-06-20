import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDTO } from './dto/create-categoria.dto';
import { UpdateCategoriaDTO } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  getAllCategorias() {
    return this.categoriasService.list_all();
  }

  @Post()
  create(@Body() createCategoria: CreateCategoriaDTO) {
    return this.categoriasService.create(createCategoria);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.categoriasService.getOneById(Number(id));
  }

  @Patch('/:id')
  updateById(
    @Param('id') id: string,
    @Body() updateCategoria: UpdateCategoriaDTO,
  ) {
    return this.categoriasService.update(Number(id), updateCategoria);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.categoriasService.delete(Number(id));
  }
}
