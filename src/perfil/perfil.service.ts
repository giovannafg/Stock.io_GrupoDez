import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PerfilService {
    constructor(private prismaService: PrismaService) {}
     async getPerfil(id: number) {
    return this.prismaService.usuarios.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        userName: true,
        foto_perfil_url: true,
        createdAt: true,
        }
    })
    }

}
