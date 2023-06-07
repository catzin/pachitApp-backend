import { IsDateString, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateAdopcionDto{

    @IsString()
    idorganizacion : string;
    
    @IsString()
    idusuario : string;

    @IsNumber()
    idmascota : number;

    @IsNumber()
    tipoSeguimiento : number;

    @IsDateString()
    fechaAdopcion: string;
    
    @IsNumber()
    frecuencia : number;



}