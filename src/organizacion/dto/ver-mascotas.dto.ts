import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { NivelActividad, TipoMascota, TipoRaza } from "src/common/enums/enums";

export class VerMascotasDto {

    @IsString()
    organizacion: string;

  
}