import { IsNotEmpty } from "class-validator";

export class AlterarSenhaDTO {
    @IsNotEmpty({ message: 'senha_atual is required' })
    readonly senha_atual!: string;

    @IsNotEmpty({ message: 'nova_senha is required' })
    readonly nova_senha!: string;
}