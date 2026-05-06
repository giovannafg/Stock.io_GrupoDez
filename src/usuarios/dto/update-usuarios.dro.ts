import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUsuariosDto {
    @IsOptional()
    @IsString({ message: 'nome must be a string' })
    readonly nome?: string;

    @IsOptional()
    @IsEmail({}, { message: 'email must be valid' })
    readonly email?: string;

    @IsOptional()
    @IsString({ message: 'senha_hash must be a string' })
    readonly senha_hash?: string;

    @IsOptional()
    @IsString({ message: 'userName must be a string' })
    readonly userName?: string;

    @IsOptional()
    @IsString({ message: 'foto_perfil_url must be a string' })
    readonly foto_perfil_url?: string;
}