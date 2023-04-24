import { IsNotEmpty, IsString, IsDate, IsDateString } from 'class-validator';

export class CreateRecordatorioDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;


  @IsDateString()
  fechaCreacion: string;


  @IsNotEmpty()
  @IsString()
  organizacion_idorganizacion: string;
}