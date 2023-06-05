import { IsString, IsInt, IsNotEmpty, IsEnum, IsArray, IsOptional } from 'class-validator';


export class CreateMascotaDto{

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  //@IsInt()
  edad: number;

  @IsNotEmpty()
  //@IsInt()
  idtipoMascota: number;

  @IsNotEmpty()
  //@IsInt()
  idtipoRaza: number;

  @IsNotEmpty()
  //@IsInt()
  idnivelActividad: number;

  @IsNotEmpty()
  //@IsInt()
  estatus: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['MACHO', 'HEMBRA'])
  sexo: string;

  //@IsArray()
  @IsOptional()
  caracteristicas?: number[]; // array de ids de las características

  @IsString({each:true})
  @IsArray()
  @IsOptional()
  images?:string[];

  @IsNotEmpty()
  idOrganizacion : string;

  @IsNotEmpty()
  secureDisable : number;


}