import { IsArray, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
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
  
    @IsOptional()
    @IsEnum(NivelActividad)
    nivelActividad?: NivelActividad;
  
    @IsOptional()
    @IsInt()
    estatus?: number;
  
    @IsOptional()
    @IsString()
    @IsEnum(['MACHO', 'HEMBRA'])
    sexo?: string;
  
    @IsOptional()
    @IsString()
    tipoMascota?: string;
  
    @IsOptional()
    @IsEnum(TipoRaza)
    tipoRaza?: TipoRaza;
  
    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    images?: string[];
  }