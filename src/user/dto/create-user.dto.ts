
import { IsEmail, IsString, IsNumber, MinLength, IsBoolean, IsDateString } from 'class-validator';
import { Unique } from 'typeorm';


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

  @IsDateString()
  fechaNacimiento: string;

  @IsDateString()
  fechaRegistro: string;

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