import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { NivelActividad, TipoMascota, TipoRaza } from "src/common/enums/enums";

export class UpdateMascotaDto {
    @IsOptional()
    @IsString()
    nombre?: string;
  
    @IsOptional()
    @IsString()
    descripcion?: string;
  
    @IsOptional()
    @IsInt()
    edad?: number;

    @IsNotEmpty()
    @IsInt()
    idnivelActividad?: number;

    @IsNotEmpty()
    @IsInt()
    idtipoMascota?: number;
  
    @IsNotEmpty()
    @IsInt()
    idtipoRaza?: number;
  
  
    @IsOptional()
    @IsInt()
    estatus?: number;
  
    @IsOptional()
    @IsString()
    @IsEnum(['MACHO', 'HEMBRA'])
    sexo?: string;
  
    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    images?: string[];
  }