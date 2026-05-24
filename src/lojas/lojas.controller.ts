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
import { LojasService } from './lojas.service';
import { CreateLojaDTO } from './dto/create-loja.dto';
import { UpdateLojaDTO } from './dto/update-loja.dto';
import { AutenticacaoGuard } from '../autenticacao/guard/autenticacao-token.guard';
import { TokenPayloadParam } from '../autenticacao/param/token-payload.param';
import { PayloadTokenDto } from '../autenticacao/dto/payload-token.dto';

@Controller('lojas')
export class LojasController {
  constructor(private readonly lojasService: LojasService) {}

  @Get()
  getAllLojas(@Query('search') search?: string) {
    return this.lojasService.list_all(search);
  }

  @Get('/usuario/:usuarioId')
  getLojasByUserId(@Param('usuarioId') usuarioId: string) {
    return this.lojasService.getLojasByUserId(Number(usuarioId));
  }

  @UseGuards(AutenticacaoGuard)
  @Post()
  create(
    @Body() createLoja: CreateLojaDTO,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.lojasService.create(createLoja, tokenPayload);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.lojasService.getOneById(Number(id));
  }

  @UseGuards(AutenticacaoGuard)
  @Patch('/:id')
  updateById(
    @Param('id') id: string,
    @Body() updateLoja: UpdateLojaDTO,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.lojasService.update(Number(id), updateLoja, tokenPayload);
  }

  @UseGuards(AutenticacaoGuard)
  @Delete('/:id')
  deleteById(
    @Param('id') id: string,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.lojasService.delete(Number(id), tokenPayload);
  }
}
