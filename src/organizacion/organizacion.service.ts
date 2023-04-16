import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DataSource, Equal, Repository } from 'typeorm';
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
        @InjectRepository(Imagenes)
        private readonly imagenesRepository: Repository<Imagenes>,
        private readonly dataSource: DataSource
    ) { }

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
                //mascotaImgs: true,
                caracteristicas: true,
                tipoMascota_idtipoMascota: true,
                tipoRaza_idtipoRaza: true,
                nivelActividad_idnivelActividad: true


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
                nivelActividad_idnivelActividad: true

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
                nivelActividad_idnivelActividad: true
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
                nivelActividad_idnivelActividad: true
            }
        });

        return mascotas
    }

    //VER MASCOTAS POR ORGANIZACION
    findMascotasbyOrganizacion(idorganizacion: string, paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        return this.mascotaRepository.find({
            take: limit,
            skip: offset,
            relations: {
                caracteristicas: true,
                tipoMascota_idtipoMascota: true,
                tipoRaza_idtipoRaza: true,
                nivelActividad_idnivelActividad: true
            },
            where: { organizacion: { idorganizacion } }
        });
    }

    //VER MASCOTA POR ID
    async findMascotasbyId(idmascota: number) {

        let mascota: Mascota;

        mascota = await this.mascotaRepository.findOneBy({ id: idmascota })


        if (!mascota) {
            return {
                status: HttpStatus.UNAUTHORIZED,
                message: 'No se encuentra la mascota'
            };
        }

        return mascota
    }

    //Crea mascota
    async createMascota(idorganizacion: string, createMascotaDto: CreateMascotaDto, files: any) {
        try {

            const { images = files, ...mascotaDetails } = createMascotaDto;

            //Busca el id de la organizacion para ver si le puede asociar una mascota   
            const organizacionFound = await this.organizacionRepository.findOne({
                where: {
                    idorganizacion
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


            const caracteristicas = await this.caracteristicaRepository.findByIds(
                createMascotaDto.caracteristicas
            );


            const imagenesFinal = [];
            for (const img of files) {

                const newImagen = this.imagenesRepository.create({
                    fechaSubida: new Date(),
                    nombre: img.originalname,
                    path: img.location
                });
                // Crea una instancia de Imagen
                imagenesFinal.push(newImagen); // Agrega la instancia al array
            }

            this.imagenesRepository.save(imagenesFinal);

            //Constante donde crea una mascota
            const newMascota = this.mascotaRepository.create({
                ...mascotaDetails,
                organizacion: organizacionFound,
                tipoMascota_idtipoMascota: tipoMascota,
                caracteristicas,
                nivelActividad_idnivelActividad: nivelAct,
                tipoRaza_idtipoRaza: tipoRaza,
                mascotaImgs: imagenesFinal

            });
            await this.mascotaRepository.save(newMascota);

            return newMascota;
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

        const { images, ...mascotaDetails } = updateMascotaDto;


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

}



