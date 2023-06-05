import { IsDateString, IsNumber, IsString} from 'class-validator';

export class UpdateSeguimientoDto{

    @IsString()
    usuario: string;

    @IsNumber()
    tipoSeguimiento:number;
  
}