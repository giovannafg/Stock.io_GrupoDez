
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatUsuariosDTO {
    @IsNotEmpty({ message: 'userName is required' })
    @IsString({ message: 'userName must be a string' })
    readonly userName!: string;

    @IsNotEmpty({ message: 'nome is required' })
    @IsString({ message: 'nome must be a string' })
    readonly nome!: string;

    @IsNotEmpty({ message: 'email is required' })
    @IsEmail({}, { message: 'email must be valid' })
    readonly email!: string;

    @IsNotEmpty({ message: 'senha_hash is required' })
    @IsString({ message: 'senha_hash must be a string' })
    readonly senha_hash!: string;

    @IsOptional()
    @IsString({ message: 'foto_perfil_url must be a string' })
    readonly foto_perfil_url?: string;
}
