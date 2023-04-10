import { Transform } from 'class-transformer';
import { IsString, IsDate, IsDateString } from 'class-validator';
import moment from 'moment';


export class CreateImagenDto{
  @IsString()
  nombre: string;

  @IsDateString()
  fechaSubida: string;
}