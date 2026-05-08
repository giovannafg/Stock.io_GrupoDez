import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
