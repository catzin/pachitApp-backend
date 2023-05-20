import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateUbicacionDto {
  @IsString()
  @IsOptional()
  street: string;

  @IsString()
  @IsOptional()
  ISOCountryCode: string;

  @IsString()
  @IsOptional()
  PostalCode: string;

  @IsString()
  @IsOptional()
  administrativeArea: string;

  @IsString()
  @IsOptional()
  subadministrativeArea: string;

  @IsString()
  @IsOptional()
  locality: string;

  @IsString()
  @IsOptional()
  sublocality: string;

  @IsString()
  @IsOptional()
  thoroughfare: string;

  @IsString()
  @IsOptional()
  Subthoroughfare: string;

  @IsString()
  @IsOptional()
  lat: string;

  @IsString()
  @IsOptional()
  lon: string;
  
  @IsString()
  usuario_idusuario: string;

}