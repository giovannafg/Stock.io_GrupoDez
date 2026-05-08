import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BscryptService } from './hash/bscrypt.service';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

//nao precisar importar em cada modulo de classe
@Global()
@Module({
    imports: [
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider())
    ],
    providers:[
        {
            provide: HashingServiceProtocol,
            useClass: BscryptService,
        },
        AutenticacaoService,
        PrismaService,
        BscryptService
    ],
    exports: [
        HashingServiceProtocol,
        JwtModule,
        ConfigModule
    ],
    controllers: [AutenticacaoController]
})
export class AutenticacaoModule {}
