import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Organizacion } from './entitites/organizacion.entity';
import { Equal, Repository } from 'typeorm';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { MascotaImagen } from '../mascota/entities/mascota-imagen.entity';

@Injectable()
export class OrganizacionService {
     
    constructor(
        @InjectRepository(Organizacion)
        private readonly organizacionRepository: Repository<Organizacion>,
        @InjectRepository(Mascota)
        private readonly mascotaRepository: Repository<Mascota>,
        @InjectRepository(MascotaImagen)
        private readonly mascotaImageRepository: Repository<MascotaImagen>
      ) {}
    
    
      
    
    //get all organizaciones
     findAll(paginationDto: PaginationDto) {
       
        //limite que establecemos para paginacion
        const {limit=10, offset=0} = paginationDto
  
        return this.organizacionRepository.find({
          take: limit,
          skip: offset,
  
          });
    }

    findMascotasbyOrganizacion(idorganizacion: string, paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
      
        return this.mascotaRepository.find({
          take: limit,
          skip: offset,
          where: { organizacion: { idorganizacion } }
        });
      }


    //Crea mascota
    async createMascota(idorganizacion: string, createMascotaDto:CreateMascotaDto){ 
        try{  

            //tema de imagenes
            const {images = [], ...mascotaDetails} = createMascotaDto;

        //Busca el id de la organizacion para ver si le puede asociar una mascota   
            const organizacionFound = await this.organizacionRepository.findOne({
                where:{
                idorganizacion
                },
            });
            
            if(!organizacionFound) {
                return {
                    status: HttpStatus.UNAUTHORIZED,
                    message: 'No se encuentra la organizacion'
                };
            }
            //Constante donde crea una mascota
            const newMascota = this.mascotaRepository.create({
                ...mascotaDetails,
                organizacion: organizacionFound,
                images: images.map( image => this.mascotaImageRepository.create({url:image}))
            });
             
            return this.mascotaRepository.save(newMascota);
            
        } catch (error) {
            console.log(error); 
                return {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Please check server logs',
                };
        }

    }


}
      
      

        