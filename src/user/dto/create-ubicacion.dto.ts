import { IsString, IsInt } from 'class-validator';

export class CreateUbicacionDto {
  @IsString()
  codigoPostal: string;

  @IsString()
  asentamiento: string;

  @IsString()
  tipoAsentamiento: string;

  @IsString()
  municipio: string;

  @IsString()
  estado: string;

  @IsString()
  ciudad: string;

  @IsString()
  colonia: string;

  @IsString()
  calle: string;

  @IsInt()
  numExterior: number;

  @IsString()
  numInt: string;

  @IsString()
  latitud: string;

  @IsString()
  longitud: string;

  @IsString()
  label: string;

  @IsString()
  usuario_idusuario: string;

}