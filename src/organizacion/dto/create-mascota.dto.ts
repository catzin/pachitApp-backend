import { IsString, IsInt, IsNotEmpty, IsEnum, IsArray, IsOptional } from 'class-validator';

enum NivelActividad {
  BAJO = 'BAJO',
  MEDIO = 'MEDIO',
  ALTO = 'ALTO',
}

enum TipoMascota {
  PERRO = 'PERRO',
  GATO = 'GATO',
  OTRO = 'OTRO',
}

enum TipoRaza {
  RAZA_1 = 'RAZA_1',
  RAZA_2 = 'RAZA_2',
  RAZA_3 = 'RAZA_3',
}

export class CreateMascotaDto{
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  edad: number;

  @IsNotEmpty()
  @IsEnum(NivelActividad)
  nivelActividad: NivelActividad;

  @IsNotEmpty()
  @IsInt()
  estatus: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['MACHO', 'HEMBRA'])
  sexo: string;

  @IsNotEmpty()
  @IsEnum(TipoMascota)
  tipoMascota: TipoMascota;

  @IsNotEmpty()
  @IsEnum(TipoRaza)
  tipoRaza: TipoRaza;

  @IsString({each:true})
  @IsArray()
  @IsOptional()
  images?:string[];
}