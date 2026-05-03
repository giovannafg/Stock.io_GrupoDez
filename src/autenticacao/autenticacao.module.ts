import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BscryptService } from './hash/bscrypt.service';

//nao precisar importar em cada modulo de classe
@Global()
@Module({
    providers:[
        {
            provide: HashingServiceProtocol,
            useClass: BscryptService
        }
    ],
    exports: [
        HashingServiceProtocol
    ]
})
export class AutenticacaoModule {}
