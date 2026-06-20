import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateCategoriaDTO {
  @IsOptional()
  @IsString({ message: 'nome must be a string' })
  readonly nome?: string;

  @IsOptional()
  @IsNumber({}, { message: 'categoria_pai_id must be a number' })
  readonly categoria_pai_id?: number;
}
