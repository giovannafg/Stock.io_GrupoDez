import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateCategoriaDTO {
  @IsNotEmpty({ message: 'nome is required' })
  @IsString({ message: 'nome must be a string' })
  readonly nome!: string;

  @IsOptional()
  @IsNumber({}, { message: 'categoria_pai_id must be a number' })
  readonly categoria_pai_id?: number;
}
