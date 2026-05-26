import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { LojasModule } from '../lojas/lojas.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { PerfilModule } from '../perfil/perfil.module';



@Module({
  imports: [UsuariosModule, AutenticacaoModule, CategoriasModule, LojasModule, ProdutosModule, PerfilModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
