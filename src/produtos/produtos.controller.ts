import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDTO } from './dto/create-produto.dto';
import { UpdateProdutoDTO } from './dto/update-produto.dto';
import { AutenticacaoGuard } from '../autenticacao/guard/autenticacao-token.guard';
import { TokenPayloadParam } from '../autenticacao/param/token-payload.param';
import { PayloadTokenDto } from '../autenticacao/dto/payload-token.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  getAllProdutos(
    @Query('search') search?: string,
    @Query('categoria_id') categoria_id?: string,
  ) {
    return this.produtosService.list_all(search, categoria_id ? Number(categoria_id) : undefined);
  }

  @Get('/loja/:lojaId')
  getProdutosByLoja(@Param('lojaId') lojaId: string) {
    return this.produtosService.getProdutosByLojaId(Number(lojaId));
  }

  @Get('/categoria/:categoriaId')
  getProdutosByCategoria(@Param('categoriaId') categoriaId: string) {
    return this.produtosService.getProdutosByCategoriaId(Number(categoriaId));
  }

  @UseGuards(AutenticacaoGuard)
  @Post()
  create(
    @Body() createProduto: CreateProdutoDTO,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.produtosService.create(createProduto, tokenPayload);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.produtosService.getOneById(Number(id));
  }

  @UseGuards(AutenticacaoGuard)
  @Patch('/:id')
  updateById(
    @Param('id') id: string,
    @Body() updateProduto: UpdateProdutoDTO,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.produtosService.update(Number(id), updateProduto, tokenPayload);
  }

  @UseGuards(AutenticacaoGuard)
  @Delete('/:id')
  deleteById(
    @Param('id') id: string,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.produtosService.delete(Number(id), tokenPayload);
  }
}
