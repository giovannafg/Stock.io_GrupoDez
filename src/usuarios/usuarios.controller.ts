import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreatUsuariosDTO } from './dto/creat-usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dro';

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

    @Patch("/:id")
    updateById(@Param('id')id:string, @Body() updateUser : UpdateUsuariosDto){
        return this.usuariosService.update(Number(id), updateUser)
    }

    @Delete("/:id")
    deleteById(@Param('id')id:string){
        return this.usuariosService.delete(Number(id))
    }

}
