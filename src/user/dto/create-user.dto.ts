import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsString, IsNumber, MinLength, isBoolean, IsBoolean } from 'class-validator';
import { Unique } from 'typeorm';
import { isDate } from 'util/types';

@Unique(['correo'])
export class CreateUserDto {

  @MinLength(1)
  @IsString()
  nombre: string;

  @MinLength(1)
  @IsString()
  apellidoPaterno: string;

  @MinLength(1) 
  @IsString()
  apellidoMaterno: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  fechaNacimiento: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  fechaRegistro: Date;

  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;

  @IsString()
  fotoPerfil: string; 

  @IsString()
  linkFacebook: string; 

  @IsString()
  linkInstagram: string; 

  @IsNumber()
  estadoCivil_idEstadoCivil: number; 

  @IsNumber()
  sexo_idSexo: number; 

  @IsNumber()
  ocupacion_idOcupacion: number; 

  @IsNumber()
  tipoUsuario_idTipoUsuario: number; 
  
  @IsNumber()
  Tipodomicilio_idTipoDomicilio: number; 

  @IsBoolean()
  isactive: boolean;

}