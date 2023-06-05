import { IsNumber, IsString } from "class-validator";

export class patchUserDto{
    @IsString()
    idusuario:string;
    @IsString()
    facebookLink : string;
    @IsString()
    instagramLink : string;
      
    @IsNumber()
    sexo_idSexo: number; 

    @IsNumber()
    estadoCivil_idEstadoCivil: number; 

    @IsNumber()
    ocupacion_idOcupacion: number; 
    
    @IsNumber()
    Tipodomicilio_idTipoDomicilio: number; 
    
}