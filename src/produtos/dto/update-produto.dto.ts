import {
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  Min,
  IsArray,
} from 'class-validator';

export class UpdateProdutoDTO {
  @IsOptional()
  @IsString({ message: 'nome must be a string' })
  readonly nome?: string;

  @IsOptional()
  @IsString({ message: 'descricao must be a string' })
  readonly descricao?: string;

  @IsOptional()
  @IsDecimal(
    { decimal_digits: '1,2' },
    { message: 'preco must be a valid decimal with up to 2 decimal places' },
  )
  readonly preco?: string;

  @IsOptional()
  @IsNumber({}, { message: 'estoque must be a number' })
  @Min(0, { message: 'estoque must be at least 0' })
  readonly estoque?: number;

  @IsOptional()
  @IsNumber({}, { message: 'categoria_id must be a number' })
  readonly categoria_id?: number;

  @IsOptional()
  @IsArray({ message: 'imagens must be an array' })
  readonly imagens?: string[];
}
