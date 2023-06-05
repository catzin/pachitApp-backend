import { IsNumber, IsString } from "class-validator";

export class createReferenciaDto{

    @IsString()
    nombre : string;
    @IsString()
    apellidoPaterno : string;
    @IsString()
    apellidoMaterno : string;
    @IsString()
    telefono : string;
    @IsNumber()
    idParentesco : number;
    @IsNumber()
    active : number;
    @IsString()
    idUsuario : string;




}