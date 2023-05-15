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
    linkDonacion?: string;


    @IsOptional()
    @IsString()
    fotoPerfil: string;

    @IsOptional()
    @IsString()
    fotoPortada: string;
  
    @IsNumber()
    @IsOptional()
    estatus: number;
  
   
    @IsOptional()
    images?:string[];
  
}