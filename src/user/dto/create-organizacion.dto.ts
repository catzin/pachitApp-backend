import { IsString, IsOptional,IsDateString, IsNumber } from 'class-validator';


export class CreateOrganizacionDto{

    @IsString()
    idusuario : string;

    @IsString()
    nombre: string;
  
    @IsString()
    descripcion: string;
  
    @IsDateString()
    fechaCreacion: string;
  
    @IsString()
    fotoPerfil: string;
  
    @IsString()
    fotoPortada: string;
  
    @IsNumber()
    estatus: number;
  
    @IsString()
    @IsOptional()
    linkDonacion?: string;
}