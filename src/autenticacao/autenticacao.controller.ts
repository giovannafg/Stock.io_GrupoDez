import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { LoginDTO } from './dto/login.dto';
import { AutenticacaoService } from './autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(
        private readonly autenticacaoService:AutenticacaoService
    ){}

    //rota do login
    @Post()
    login(@Body() logindto: LoginDTO){
        return this.autenticacaoService.logar(logindto)
    }

    @Post('/logout')
    logout(@Res() res: Response) {
    res.clearCookie('token')
    return res.json({ ok: true })
    }
}
