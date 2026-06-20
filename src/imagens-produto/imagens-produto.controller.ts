import { Controller, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { ImagensProdutoService } from './imagens-produto.service';
import { Body, Get, Post } from '@nestjs/common';
import { CreatImagensProdutoDTO } from './dto/creat-imagem.dto';
import { AutenticacaoGuard } from '../autenticacao/guard/autenticacao-token.guard';
import { TokenPayloadParam } from '../autenticacao/param/token-payload.param';
import { PayloadTokenDto } from '../autenticacao/dto/payload-token.dto';

@Controller('imagens-produto')
export class ImagensProdutoController {
    constructor(private readonly imagensProdutoService: ImagensProdutoService) {  }

    @Get()
    getAllImagensProduto() {
        return this.imagensProdutoService.list_all()
    }

    @UseGuards(AutenticacaoGuard)
    @Post("/:produtoId/")
    createImagensProduto(@Body() createImagensProdutoDTO: CreatImagensProdutoDTO, @Param('produtoId') produtoId: number
    , @TokenPayloadParam() tokenPayload: PayloadTokenDto
    ) {
        console.log("entrei aq")
        return this.imagensProdutoService.create(createImagensProdutoDTO, produtoId, tokenPayload );
    }

    @Get("/:produtoId/")
    getImagensByProdutoId(@Param('produtoId') produtoId: number) {
        return this.imagensProdutoService.getImagensByProdutoId(produtoId);
    }

    @UseGuards(AutenticacaoGuard)
    @Patch("/:id")
    updateImagensProduto(@Param('id') id: number, @Body() updateImagensProdutoDTO: CreatImagensProdutoDTO,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto
    ) {
        return this.imagensProdutoService.update(id, updateImagensProdutoDTO, tokenPayload);
    }

    @UseGuards(AutenticacaoGuard)
    @Delete("/:Imagem-Produtoid")
    deleteImagensProduto(@Param('id') id: number,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto
    ) {
        return this.imagensProdutoService.delete(id, tokenPayload);
    }
}
