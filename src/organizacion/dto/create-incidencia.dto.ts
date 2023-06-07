import { IsDateString, IsNumber, IsString } from "class-validator";

export class IncidenciaDto{

    @IsNumber()
    idmascota : number;

    @IsNumber()
    gasto : number;

    @IsString()
    motivo : string;

    @IsDateString()
    fecha : string;

}