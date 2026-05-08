import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreatUsuariosDTO } from './dto/creat-usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dro';
import { AutenticacaoGuard } from '../autenticacao/guard/autenticacao-token.guard';
import type { Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD_NAME } from '../autenticacao/commom/autenticacao.constants';
import { TokenPayloadParam } from '../autenticacao/param/token-payload.param';
import { PayloadTokenDto } from '../autenticacao/dto/payload-token.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService){}

    
    @Get()
    getAllUsers(){
        return this.usuariosService.list_all()
    }

    @Post()
    creat(@Body() createUser: CreatUsuariosDTO){
        return this.usuariosService.create(createUser)
    }

    @Get("/:id")
    getById(@Param('id')id:string){
        return this.usuariosService.getoOneById(Number(id))
    }

    @UseGuards(AutenticacaoGuard)
    @Patch("/:id")
    updateById(@Param('id')id:string, @Body() updateUser : UpdateUsuariosDto,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto
    ){
        // console.log('pauload:' , tokenPayload)

        return this.usuariosService.update(Number(id), updateUser, tokenPayload)
    }

    @Delete("/:id")
    deleteById(@Param('id')id:string){
        return this.usuariosService.delete(Number(id))
    }

}
