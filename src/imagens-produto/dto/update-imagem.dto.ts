import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateImagensProdutoDTO {
    @IsOptional()
    @IsString({ message: 'url_imagem must be a string' })
    readonly url_imagem?: string;

    @IsOptional()
    @IsNumber({}, { message: 'produto_id must be a number' })
    readonly produto_id?: number;

    @IsOptional()
    @IsNumber({}, { message: 'ordem must be a number' })
    readonly ordem?: number
}