import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { AutenticacaoGuard } from '../autenticacao/guard/autenticacao-token.guard';
import type { Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD_NAME } from '../autenticacao/commom/autenticacao.constants';

@Controller('perfil')
export class PerfilController {
    constructor(private readonly perfilService: PerfilService){ }

    @Get()
    @UseGuards(AutenticacaoGuard)
    async getPerfil(@Req() req: Request){
        const payload=req[REQUEST_TOKEN_PAYLOAD_NAME]
        // console.log('payload:', payload)
        return this.perfilService.getPerfil(payload.sub)
    }

    @Get(':id')
    async getPerfilPublico(@Param('id') id: string) {
    return this.perfilService.getPerfil(Number(id))
}
}
