import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatImagensProdutoDTO {

    @IsNotEmpty({ message: 'url_imagem is required' })
    @IsString({ message: 'url_imagem must be a string' })
    readonly url_imagem!: string;

    @IsNotEmpty({ message: 'url_imagem is required' })
    @IsNumber({}, { message: 'produto_id must be a number' })
    readonly ordem!: number
}