import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatUsuariosDTO } from './dto/creat-usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dro';
import { HashingServiceProtocol } from '../autenticacao/hash/hashing.service';
import { PayloadTokenDto } from '../autenticacao/dto/payload-token.dto';
import { AlterarSenhaDTO } from './dto/alterar-senha.dto';

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
        const existingUser = await this.prismaService.usuarios.findFirst({
            where: {
                email: createUsuarioDTO.email,
            },
        });

        if (existingUser) {
            throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT);
        }

        const passwordHash = await this.hashingService.hash(createUsuarioDTO.senha_hash);
        const newUsuario = await this.prismaService.usuarios.create({
            data: {
                userName: createUsuarioDTO.userName,
                nome: createUsuarioDTO.nome,
                email: createUsuarioDTO.email,
                senha_hash: passwordHash,
                foto_perfil_url: createUsuarioDTO.foto_perfil_url,
            },
        });
        return newUsuario;
    }

    async update(id :number, updateUser : UpdateUsuariosDto, tokenPayload: PayloadTokenDto){

        const findUser = await this.prismaService.usuarios.findFirst({
            where:{
                id: id
            }
        })
        if(!findUser){
            throw new HttpException("esse user n existe", HttpStatus.NOT_FOUND)
        }

        if(findUser.id !== tokenPayload.sub){
            throw new HttpException("Usuario n autorizado", HttpStatus.FORBIDDEN)
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

    async updateSenha(id :number, alterarSenha: AlterarSenhaDTO, tokenPayload: PayloadTokenDto){

        const findUser = await this.prismaService.usuarios.findFirst({
            where:{
                id: id
            }
        })
        if(!findUser){
            throw new HttpException("esse user n existe", HttpStatus.NOT_FOUND)
        }

        if(findUser.id !== tokenPayload.sub){
            throw new HttpException("Usuario n autorizado", HttpStatus.FORBIDDEN)
        }

        findUser.senha_hash
        const senhaValida = await this.hashingService.compare(alterarSenha.senha_atual, findUser.senha_hash)

        if(!senhaValida){
            throw new HttpException("Senha atual incorreta", HttpStatus.BAD_REQUEST)
        }

        if(alterarSenha.nova_senha){
            const passwordHash=await this.hashingService.hash(alterarSenha.nova_senha)
            const userUpdated= await this.prismaService.usuarios.update({
                where: {
                    id : id
                }, data: {
                    senha_hash: passwordHash
                }
            })
            return userUpdated
        }
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
