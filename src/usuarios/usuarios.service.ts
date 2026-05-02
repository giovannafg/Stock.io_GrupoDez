import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuariosService {
    constructor(private prismaService:PrismaService){}
    
    List_all(){
        return "testando"
    }

}
