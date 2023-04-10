import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsEmail, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {

  @IsString()
  nombre: string;

  @IsString()
  apellidoPaterno: string;

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

}