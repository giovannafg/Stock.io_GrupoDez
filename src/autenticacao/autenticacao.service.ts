import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { BscryptService } from './hash/bscrypt.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacaoService {
    constructor(
        private prismaService: PrismaService,
        private readonly AutenticacaoService: BscryptService,

        //Importando o jwt
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService

    ){ }     

    async logar(login : LoginDTO){
        const user = await this.prismaService.usuarios.findFirst({
            where: {
                email: login.email
            }
        })

        if(!user){
            // caso n ache um email valido
            throw new HttpException("Falha ao fazer login", HttpStatus.UNAUTHORIZED)
        }

        //senha errada
        const validacao= await this.AutenticacaoService.compare(login.senha,user.senha_hash)
        if(!validacao){
            throw new HttpException("Falha ao fazer login", HttpStatus.UNAUTHORIZED)
        }

        const token= await this.jwtService.signAsync(
            {
            sub: user.id,
            email:user.email,
            },
            {
            secret: this.jwtConfiguration.secret,
            expiresIn: this.jwtConfiguration.jwtTtl as any, 
            audience: this.jwtConfiguration.audience ,
            issuer: this.jwtConfiguration.issuer
            }
        )

        
        return {"email": user.email , "nome" : user.nome , "senha": user.senha_hash, "token": token}
    }
}
