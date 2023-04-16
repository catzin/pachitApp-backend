import { IsString} from 'class-validator';

export class CreatePeticionDto{

    @IsString()
    idusuario : string;
    @IsString()
    linkFacebook : string;
    @IsString()
    linkInstagram : string;
    @IsString()
    linkWeb : string;
    @IsString()
    motivo: string;
  

}