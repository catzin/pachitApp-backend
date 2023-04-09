import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {

  @IsString()
  nombre: string;

  @IsString()
  apellidoPaterno: string;

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

}