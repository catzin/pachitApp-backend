import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { Repository } from 'typeorm';
import { Imagenes } from './entities/imagenes.entity';

@Injectable()
export class FilesService {


    constructor(
        @InjectRepository(Organizacion)
        private readonly organizacionRepository: Repository<Organizacion>,
        @InjectRepository(Mascota)
        private readonly mascotaRepository: Repository<Mascota>,
        @InjectRepository(Imagenes)
        private readonly imagenesRepository: Repository<Imagenes>
      ) {}

  
    //Valida que exista la imagen
    getStaticMascotaImg(imageName:string){

        const path = join(__dirname,'../../static/mascotas', imageName);

        if(!existsSync(path))
            throw new BadRequestException('La imagen no existe con ese nombre en el servidor');
        

        return path;

    }

    async createImagen(idMascota:number,createImagenDto:CreateImagenDto){

      //tema de imagenes
      const { ...imagenDetails} = createImagenDto;



          const mascotaFound = await this.mascotaRepository.findOne({
            where:{
            id: idMascota
            },
        });

        const newImagen = this.imagenesRepository.create({
            ...imagenDetails,
        
        });
         
        await this.mascotaRepository.save(newImagen);
        





    }


}
