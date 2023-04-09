import { IsString, IsDate, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrganizacionDto{

  
    @IsString()
    nombre: string;
  
    @IsString()
    descripcion: string;
  
    @IsDate()
    @Transform(({ value }) => new Date(value))
    fechaCreacion: Date;
  
    @IsString()
    linkInstagram: string;
  
    @IsString()
    linkFacebook: string;
  
    @IsString()
    fotoPerfil: string;
  
    @IsString()
    fotoPortada: string;
  
    @IsString()
    estatus: number;
  
    @IsString()
    @IsOptional()
    linkDonacion?: string;

    // @IsString()
    // @IsUUID()
    // usuario: number;
  
    // @IsString()
    // usuario_idusuario: string;
}