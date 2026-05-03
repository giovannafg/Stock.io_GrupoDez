import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';

@Module({
  imports: [UsuariosModule, AutenticacaoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
