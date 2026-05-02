import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService){}

    @Get()
    getAllUsers(){
        return this.usuariosService.List_all()
    }

    @Post()
    creat(){
        return "adicionar no banco um"
    }

    @Get("/:id")
    getById(@Param('id')id:string){
        return "adicionando pelo id"
    }

    @Patch("/:id")
    attById(@Param('id')id:string){
        return "att user"
    }

    @Delete("/:id")
    deleteById(@Param('id')id:string){
        return "Deletando user"
    }

}
