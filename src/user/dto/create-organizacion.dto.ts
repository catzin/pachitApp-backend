import { IsString, IsDate, IsOptional, IsUUID, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrganizacionDto{

    @IsString()
    idusuario : string;

    @IsString()
    nombre: string;
  
    @IsString()
    descripcion: string;
  
    @IsDateString()
    fechaCreacion: Date;
  
    @IsString()
    fotoPerfil: string;
  
    @IsString()
    fotoPortada: string;
  
    @IsString()
    estatus: number;
  
    @IsString()
    @IsOptional()
    linkDonacion?: string;
}