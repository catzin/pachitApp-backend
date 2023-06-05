import { IsNotEmpty, IsString, IsDate, IsDateString, IsNumber } from 'class-validator';

export class CreateRecordatorioDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsDateString()
  fechaCreacion: string;

  @IsDateString()
  fechaEvento : string;

  @IsNumber()
  vencido : number;

  @IsNotEmpty()
  @IsString()
  organizacion_idorganizacion: string;
}