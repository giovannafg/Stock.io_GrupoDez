import { IsOptional, IsString } from 'class-validator';

export class UpdateLojaDTO {
  @IsOptional()
  @IsString({ message: 'nome must be a string' })
  readonly nome?: string;

  @IsOptional()
  @IsString({ message: 'descricao must be a string' })
  readonly descricao?: string;

  @IsOptional()
  @IsString({ message: 'logo_url must be a string' })
  readonly logo_url?: string;

  @IsOptional()
  @IsString({ message: 'banner_url must be a string' })
  readonly banner_url?: string;

  @IsOptional()
  @IsString({ message: 'sticker_url must be a string' })
  readonly sticker_url?: string;
}
