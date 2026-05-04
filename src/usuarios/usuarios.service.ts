import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatUsuariosDTO } from './dto/creat-usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dro';
import { HashingServiceProtocol } from '../autenticacao/hash/hashing.service';

@Injectable()
export class UsuariosService {
    constructor(
        private prismaService:PrismaService,
        private readonly hashingService: HashingServiceProtocol
    ){}
    

    async list_all(){
        const allTasks= await this.prismaService.usuarios.findMany()
        return allTasks;
    }

    async getoOneById(id: number){
        const user= await this.prismaService.usuarios.findFirst({
            where:{
                id: id
            }
            // select:{
            //     lojas: true
            // }
        })

        if(!user){
            throw new HttpException("essa tarefa n existe", HttpStatus.NOT_FOUND)
        }

        return user

    }

    async create(createUsuarioDTO: CreatUsuariosDTO){
        const passwordHash=await this.hashingService.hash(createUsuarioDTO.senha_hash)
        const newUsuario= await this.prismaService.usuarios.create({
            data:{
                userName: createUsuarioDTO.userName,
                nome: createUsuarioDTO.nome,
                email: createUsuarioDTO.email,
                senha_hash: passwordHash,
                foto_perfil_url: createUsuarioDTO.foto_perfil_url,
            }
        })
        return newUsuario
    }

    async update(id :number, updateUser : UpdateUsuariosDto){

        const findUser = await this.prismaService.usuarios.findFirst({
            where:{
                id: id
            }
        })
        if(!findUser){
            throw new HttpException("essa tarefa n existe", HttpStatus.NOT_FOUND)
        }

        const dataUser: { nome?: string, passwordHash?: string}={
            nome:updateUser.nome ? updateUser.nome : findUser.nome
        }

        if(updateUser.senha_hash){
            const passwordHash=await this.hashingService.hash(updateUser.senha_hash)
            dataUser['passwordHash']=passwordHash
        }

        const userUpdated= await this.prismaService.usuarios.update({
            where: {
                id : id
            }, data: {
                nome: dataUser.nome,
                email: updateUser.email,
                userName: updateUser.userName,
                senha_hash: dataUser.passwordHash ? dataUser.passwordHash : findUser.senha_hash,
                foto_perfil_url: updateUser.foto_perfil_url
            }
        })

        return userUpdated
    }

    async delete(id: number){
        const findUser = await this.prismaService.usuarios.findFirst({
            where:{
                id: id
            }
        })
        if(!findUser){
            throw new HttpException("essa tarefa n existe", HttpStatus.NOT_FOUND)
        }

        await this.prismaService.usuarios.delete({
            where:{
                id: findUser.id
            }
        })

        return "User deletado"
    }
}
