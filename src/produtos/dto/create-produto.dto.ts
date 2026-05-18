import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDecimal,
  Min,
  IsArray,
} from 'class-validator';

export class CreateProdutoDTO {
  @IsNotEmpty({ message: 'loja_id is required' })
  @IsNumber({}, { message: 'loja_id must be a number' })
  readonly loja_id!: number;

  @IsNotEmpty({ message: 'categoria_id is required' })
  @IsNumber({}, { message: 'categoria_id must be a number' })
  readonly categoria_id!: number;

  @IsNotEmpty({ message: 'nome is required' })
  @IsString({ message: 'nome must be a string' })
  readonly nome!: string;

  @IsOptional()
  @IsString({ message: 'descricao must be a string' })
  readonly descricao?: string;

  @IsNotEmpty({ message: 'preco is required' })
  @IsDecimal(
    { decimal_digits: '1,2' },
    { message: 'preco must be a valid decimal with up to 2 decimal places' },
  )
  readonly preco!: string;

  @IsNotEmpty({ message: 'estoque is required' })
  @IsNumber({}, { message: 'estoque must be a number' })
  @Min(0, { message: 'estoque must be at least 0' })
  readonly estoque!: number;

  @IsOptional()
  @IsArray({ message: 'imagens must be an array' })
  readonly imagens?: string[];
}
