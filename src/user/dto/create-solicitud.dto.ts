import { IsDateString, IsNumber, IsString} from 'class-validator';

export class CreateSolicitudAdopcionDto{

  
    @IsDateString()
    fechaSolicitud: Date;

    @IsNumber()
    mascota : number;

    @IsString()
    usuario: string;
  

}