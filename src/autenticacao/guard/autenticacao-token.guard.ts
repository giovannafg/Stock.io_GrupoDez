import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import jwtConfig from "../config/jwt.config";
import { REQUEST_TOKEN_PAYLOAD_NAME } from "../commom/autenticacao.constants";

@Injectable()
export class AutenticacaoGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
        //Importando o jwt
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {} 

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenHeader(request)

        if(!token){
            throw new UnauthorizedException("Token não encontrado")
        }

        try {
            const payload= await this.jwtService.verifyAsync(token,this.jwtConfiguration)
            console.log(payload)
            request[REQUEST_TOKEN_PAYLOAD_NAME]=payload

        } catch (error) {
            console.log(error)
            throw new UnauthorizedException("acesso não autorizado")
        }
        return true

    }

    extractTokenHeader(request: Request){
        const autorizacao= request.headers?.authorization

        if(!autorizacao || typeof autorizacao != "string"){
            return
        }

        return autorizacao.split(' ')[1]
    }
}