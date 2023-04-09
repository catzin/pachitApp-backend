import { IsString, IsDate } from 'class-validator';

export class CreateImagenDto{
  @IsString()
  nombre: string;

  @IsString()
  path: string;

  @IsDate()
  fechaSubida: Date;
}