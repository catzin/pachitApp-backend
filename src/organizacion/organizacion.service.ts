import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DataSource, Equal, FindOneOptions, Repository } from 'typeorm';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { isNumber, isUUID } from 'class-validator';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Caracteristica } from '../mascota/entities/caracteristica.entity';
import { TipoMascota } from '../mascota/entities/tipo-mascota.entity';
import { Imagenes } from 'src/mascota/entities/imagenes.entity';
import { TipoRaza } from 'src/mascota/entities/tipo-raza.entity';
import { NivelActividad } from 'src/mascota/entities/nivel-actividad.entity';
import { VerMascotasDto } from './dto/ver-mascotas.dto';
import { SolicitudAdopcion } from 'src/mascota/entities/solicitud-adopcion.entity';
import { CreateRecordatorioDto } from './dto/create-recordatorio.entity';
import { Recordatorio } from './entitites/recordatorio.entity';
import { PetAge } from 'src/catalogs/entities';
import { S3Service } from 'src/s3/s3.service';
import { Usuario } from 'src/user/entity/usuario.entity';
import { Firma } from 'src/user/entity/firma.entity';


@Injectable()
export class OrganizacionService {

    constructor(
        @InjectRepository(Organizacion)
        private readonly organizacionRepository: Repository<Organizacion>,
        @InjectRepository(Mascota)
        private readonly mascotaRepository: Repository<Mascota>,
        @InjectRepository(TipoMascota)
        private readonly tipoMascotaRepository: Repository<TipoMascota>,
        @InjectRepository(TipoRaza)
        private readonly tipoRazaRepository: Repository<TipoRaza>,
        @InjectRepository(NivelActividad)
        private readonly nivelActividadRepository: Repository<NivelActividad>,
        @InjectRepository(Caracteristica)
        private readonly caracteristicaRepository: Repository<Caracteristica>,
        @InjectRepository(Recordatorio)
        private readonly recordatorioRepository: Repository<Recordatorio>,
        @InjectRepository(Imagenes)
        private readonly imagenesRepository: Repository<Imagenes>,
        @InjectRepository(SolicitudAdopcion)
        private readonly solicitudAdopcionRepository: Repository<SolicitudAdopcion>,
        private readonly dataSource: DataSource,
        @InjectRepository(PetAge)
        private readonly petAgeRepository : Repository<PetAge>,
        private readonly s3Service : S3Service,
        @InjectRepository(Usuario)
        private readonly userRepository : Repository<Usuario>,
        @InjectRepository(Firma)
        private readonly firmaRepository : Repository<Firma>,
        @InjectRepository(SolicitudAdopcion)
        private readonly solicitudesRepository : Repository<SolicitudAdopcion>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository : Repository<Usuario>,
    ) { }


    async GetCaracts(){
       const caracters = await this.caracteristicaRepository.find();
       return caracters;
    }

    async findRazaType(){
        const raza = await this.tipoRazaRepository.find();
        return raza;
    }

    async findPetTypes(){
        const types = await this.tipoMascotaRepository.find();
        return types;
     }
    
    async findActivityLevels(){
        const leves = await this.nivelActividadRepository.find();
        return leves;
    }

    //get all organizaciones
    findAllOrganicaciones(paginationDto: PaginationDto) {

        //limite que establecemos para paginacion
        const { limit = 10, offset = 0 } = paginationDto

        return this.organizacionRepository.find({
            take: limit,
            skip: offset
        });
    }

    //Obtiene todas las mascotas por TIPO - Catalogo 1
    async findAllMascotasByTipo(paginationDto: PaginationDto, tipoMascota: number) {

        //limite que establecemos para paginacion
        const { limit = 10, offset = 0 } = paginationDto

        const tipoMascotaa = await this.tipoMascotaRepository.findOne({
            where: {
                idtipoMascota: tipoMascota
            },
        });

        return await this.mascotaRepository.find({
            take: limit,
            skip: offset,
            relations: {
                mascotaImgs: true,
                caracteristicas: true,
                tipoMascota_idtipoMascota: true,
                tipoRaza_idtipoRaza: true,
                nivelActividad_idnivelActividad: true,
                edad : true
             

            },
            where: {
                tipoMascota_idtipoMascota: tipoMascotaa,
            },
        });
    }

    //Obtiene todas las mascotas por RAZA - Catalogo 2
    async findAllMascotasByRaza(paginationDto: PaginationDto, tipoRaza: number) {

        //limite que establecemos para paginacion
        const { limit = 10, offset = 0 } = paginationDto

        const tipoRazaa = await this.tipoRazaRepository.findOne({
            where: {
                idtipoRaza: tipoRaza
            },
        });

        return await this.mascotaRepository.find({
            take: limit,
            skip: offset,
            relations: {
                caracteristicas: true,
                tipoRaza_idtipoRaza: true,
                nivelActividad_idnivelActividad: true,
                edad : true

            },
            where: {
                tipoRaza_idtipoRaza: tipoRazaa,
            },
        });
    }

    //Obtiene todas las mascotas por RAZA - Catalogo 2
    async findAllMascotasByNivel(paginationDto: PaginationDto, nivelActividad: number) {

        //limite que establecemos para paginacion
        const { limit = 10, offset = 0 } = paginationDto

        const nivelActividadd = await this.nivelActividadRepository.findOne({
            where: {
                idnivelActividad: nivelActividad
            },
        });

        return await this.mascotaRepository.find({
            take: limit,
            skip: offset,
            relations: {
                caracteristicas: true,
                tipoRaza_idtipoRaza: true,
                nivelActividad_idnivelActividad: true,
                edad : true
            },
            where: {
                nivelActividad_idnivelActividad: nivelActividadd,
            },
        });
    }

    //get all MASCOTAS
    findAllMascotas(paginationDto: PaginationDto) {

        //limite que establecemos para paginacion
        const { limit = 10, offset = 0 } = paginationDto


        const mascotas = this.mascotaRepository.find({
            take: limit,
            skip: offset,
            relations: {
                mascotaImgs: true,
                caracteristicas: true,
                tipoMascota_idtipoMascota: true,
                tipoRaza_idtipoRaza: true,
                nivelActividad_idnivelActividad: true,
                edad : true
            }
        });

        return mascotas
    }

    //VER MASCOTAS POR ORGANIZACION
    async findMascotasbyOrganizacion(idorganizacion: string, paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        const result = await this.mascotaRepository.find({
            take: limit,
            skip: offset,
            relations: {
                mascotaImgs: true,
                caracteristicas: true,
                tipoMascota_idtipoMascota: true,
                tipoRaza_idtipoRaza: true,
                nivelActividad_idnivelActividad: true,
                edad : true
            },
            where: { organizacion: { idorganizacion } }
        });

        return  result;
    }

    //VER MASCOTA POR ID
    async findMascotasbyId(idmascota: number) {



        const mascota = await this.mascotaRepository.findOne({
            where : {id : idmascota},
            relations: {
                mascotaImgs : true,
                caracteristicas : true,
                tipoMascota_idtipoMascota:true,
                tipoRaza_idtipoRaza:true,
                nivelActividad_idnivelActividad:true,
                edad : true

            }
        });


        if (!mascota) {
            throw new NotFoundException('No se encuentra la mascota');
        }

        return mascota
    }

    async searchIdOrg(idUsuario: string) {

        const options: FindOneOptions<Organizacion> = {
            where: { usuario: { idusuario: idUsuario } },
            relations: ['usuario'],
        };
 
        const result = await this.organizacionRepository.findOne(options);

        return result.idorganizacion;

    }

    //Crea mascota
    async createMascota(createMascotaDto: CreateMascotaDto, files: Express.Multer.File[]) {
        try {
            
           
            const { ...mascotaDetails } = createMascotaDto;

            //Busca el id de la organizacion para ver si le puede asociar una mascota   
            const organizacionFound = await this.organizacionRepository.findOne({
                where: {
                    idorganizacion : createMascotaDto.idOrganizacion.toString()
                  
                },
            });
      
            //Idea crear ottra constante que almacene algo tipo "newImagenMascota" 
            if (!organizacionFound) {
                return {
                    status: HttpStatus.UNAUTHORIZED,
                    message: 'No se encuentra la organizacion'
                };
            }

            //imagenes de la tabla general
            const tipoMascota = await this.tipoMascotaRepository.findOne({
                where: {
                    idtipoMascota: createMascotaDto.idtipoMascota
                },
            });

            const tipoRaza = await this.tipoRazaRepository.findOne({
                where: {
                    idtipoRaza: createMascotaDto.idtipoRaza
                }
            })

            const nivelAct = await this.nivelActividadRepository.findOne({
                where: {
                    idnivelActividad: createMascotaDto.idnivelActividad
                }
            })

            const edadCreate = await this.petAgeRepository.findOne({
                where: {
                    idEdad: createMascotaDto.edad
                }
            })


            const caracteristicas = await this.caracteristicaRepository.findByIds(
                createMascotaDto.caracteristicas
            );

            let keys = [];
            const imagesFinal = [];

            files.forEach((e, index) => {
                keys.push(`${e.originalname.split('.')[0]}${Date.now()}.${e.originalname.split('.')[1]}`);

            });
       
            const imagesUrl = await this.s3Service.uploadFiles(files,keys);
            imagesUrl.forEach((imag,index) => {

                const newImagen = this.imagenesRepository.create({
                    fechaSubida: new Date(),
                    nombre: keys[index],
                    path: imag
                });
                // Crea una instancia de Imagen
                imagesFinal.push(newImagen)
                

            });
           
            await this.imagenesRepository.save(imagesFinal);

            //Constante donde crea una mascota
            const newMascota = await this.mascotaRepository.create({
                ...mascotaDetails,
                organizacion: organizacionFound,
                tipoMascota_idtipoMascota: tipoMascota,
                caracteristicas,
                nivelActividad_idnivelActividad: nivelAct,
                tipoRaza_idtipoRaza: tipoRaza,
                mascotaImgs: imagesFinal,
                edad: edadCreate

            });
            
            const saved =  await this.mascotaRepository.save(newMascota);

            const {organizacion, ...petWitouthOrg} = saved;

            return petWitouthOrg;
        } catch (error) {
            console.log(error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Please check server logs',
            };
        }

    }

    //UPDATE MASCOTA CON IMAGENES
    async updateMascota(id: number, updateMascotaDto: UpdateMascotaDto) {

        const { images, edad ,...mascotaDetails } = updateMascotaDto;


        const mascotafound = await this.mascotaRepository.findOne({
            where: {
                id
            },
        });

        const mascota = this.mascotaRepository.merge(mascotafound, mascotaDetails);

        if (!mascota) {
            return {
                status: HttpStatus.UNAUTHORIZED,
                message: 'No se encuentra la mascota'
            };
        }

        //validamos si hay imagenes en la mascota
        //CREATE QUERY RUNNER
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            //quiero borrar todas las imagenes si vienen las imagenes en el updatedto
            if (images) {
                // await queryRunner.manager.delete(MascotaImagen, { mascota: { id: id } })

                //mascota.images = images.map(image => this.mascotaImageRepository.create({url:image}))
            } else {

            }

            await queryRunner.manager.save(mascota);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return mascota;
        } catch (error) {

            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Please check server logs',
            };
        }
    }

    //ELIMINA UNA MASCOTA
    async deleteMascota(id: number) {
        const mascota = await this.mascotaRepository.findOneBy({ id: id });
        await this.mascotaRepository.remove(mascota);
    }

    //ELIMINA TODAS MASCOTAS CON QUERYBUILDER
    async deleteAllMascotas() {
        //Creas el mascota repository con el alias de mascota
        const query = this.mascotaRepository.createQueryBuilder('mascota');

        try {
            return await query
                .delete()
                .where({}) //no l mando ninguna condición es decir que seleccione todos las mascotas.
                .execute();

        } catch (error) {
            console.log(error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Please check server logs',
            };
        }
    }

    async verEstatusMascotas(verMascotasDto:VerMascotasDto){
 
    //Busca el id de la organizacion para ver si le puede asociar una mascota   
        const organizacionFound = await this.organizacionRepository.findOne({
            where: {
                idorganizacion:verMascotasDto.organizacion
            },
        });

    //Idea crear ottra constante que almacene algo tipo "newImagenMascota" 
        if (!organizacionFound) {
            return {
                status: HttpStatus.UNAUTHORIZED,
                message: 'No se encuentra la organizacion'
            };
        }
        


        const mascotas = this.mascotaRepository.find({
            relations: {
                solicitudAdopcion: {
                    usuario: true
                }
            },
            where: { 
                organizacion: organizacionFound
             }
        });

        

        return mascotas;


    }


        //Crear recordatorio de la organizacion
        async creaRecordatorio(recordatorio:CreateRecordatorioDto){
            
            try {
      
              //Una vez encontrado el usuario
              const organizacionFound = await this.organizacionRepository.findOne({
                  where: {
                      idorganizacion:recordatorio.organizacion_idorganizacion
                  },
              });
      
              if (!organizacionFound) {
                throw new NotFoundException('Organizacion not found');
      
              }
             
      
              const newRecordatorio = await this.recordatorioRepository.create({
                  ...recordatorio,
                  organizacion: organizacionFound,
              });

              
      
              const saved =  await this.recordatorioRepository.save(newRecordatorio);

              const {organizacion, ...data} = saved;

              return data;
      
          } catch (error) {
            console.log(error);
              return {
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: 'Please check server logs',
              };
          }
          }
      


        //GET ALL RECORDATORIOS POR ORGANIZACION
        async finAllRecordatorios(term:string) {       
    
            //aqui se hace la validacion para ver por donde busca
            if( isUUID(term) ){
    
    
                const organizacionFound = await this.organizacionRepository.findOne({
                    where:{
                    idorganizacion:term
                }
            });

            if(!organizacionFound){
                throw new NotFoundException('Organizacion not found');
            }
    
            const recordatoriosFound = await this.recordatorioRepository.find({
                where : {
                organizacion : organizacionFound
                }
            });
    
            return {
                status : HttpStatus.OK,
                message : "Success",
                recordatoriosFound
            };
    
            }
    
        }  

        async findMyOrg(idusuario : string){
            const orgFound = await this.organizacionRepository.findOne({
                where : {usuario : { idusuario : idusuario} }
            });

            if(!orgFound){
                new NotFoundException('El usuario no cuenta con una organización');
            }

            return orgFound;
        }


        async uploadSignature(idusuario : string,file: Express.Multer.File){
            console.log(file);
            const user = await this.userRepository.findOne({
                where : { idusuario : idusuario}
            });

       

            if(!user){
                throw new NotFoundException('Usuario no válido');
            }

            const key = `${file.originalname.split('.')[0]}${Date.now()}.${file.originalname.split('.')[1]}`;
            const urlResult = await this.s3Service.uploadFile(file,key);

            const created = await this.firmaRepository.create({
                path : urlResult,
                usuario : user
            
            });

            const resultCreated = await this.firmaRepository.save(created);

            if(!resultCreated){
                return -1;
            }
            else{
                return 1;
            }

        }

        async findAllPetRequest(idOrganizacion : string){

            
            const petitions = await this.solicitudesRepository.createQueryBuilder('solicitudAdopcion')
                .innerJoin('solicitudAdopcion.mascota', 'mascota')
                .innerJoin('mascota.organizacion', 'organizacion')
                .select(['mascota.id', 'mascota.nombre'])
                .where('organizacion.idorganizacion = :idOrganizacion', { idOrganizacion })
                .groupBy('mascota.id')
                .addGroupBy('mascota.nombre')
                .getRawMany();

            return petitions;
        }

    async updateShelterProfilePicture(file: Express.Multer.File, idorganizacion: string, type: number) {


        const key = `${file.originalname.split('.')[0]}${Date.now()}.${file.originalname.split('.')[1]}`;
        const imageUrl = await this.s3Service.uploadFile(file, key);

        if (type === 0) {
            const user = await this.organizacionRepository.update(
                { idorganizacion: idorganizacion },
                { fotoPerfil: imageUrl }
            );


            if (!user) {
                throw new NotFoundException(
                    "ID no válido",
                );
            }
        }
        else {

            const user = await this.organizacionRepository.update(
                { idorganizacion: idorganizacion },
                { fotoPortada: imageUrl }
            );


            if (!user) {
                throw new NotFoundException(
                    "ID no válido",
                );
            }

        }



        return {
            status: HttpStatus.OK,
            imageUrl
        }


    }


    async fidRequestByPet(idMascota : number){

        const pets = await this.solicitudAdopcionRepository.find({
            where : {
                mascota : {id : idMascota} 
            },
            relations: [
                'usuario',  
                'usuario.ubicacion',
                'usuario.contactosReferencia',
                'usuario.firmas',
                'usuario.horariocontacto',
                //'usuario.documentacionImage',

            ],

        });


        if(!pets){
            throw new BadRequestException('No existen solicitudes');
        }


        return pets;

    }
            

}



