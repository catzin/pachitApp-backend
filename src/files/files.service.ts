import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  
    //Valida que exista la imagen
    getStaticMascotaImg(imageName:string){

        const path = join(__dirname,'../../static/mascotas', imageName);

        if(!existsSync(path))
            throw new BadRequestException('La imagen no existe con ese nombre en el servidor');


        return path;

    }

}
