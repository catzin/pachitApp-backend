import { IsDateString, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateAdopcionDto{

    @IsString()
    idorganizacion : string;
    
    @IsString()
    idusuario : string;

    @IsNumber()
    idmascota : number;

    @IsDateString()
    fechaAdopcion: string;
   



}