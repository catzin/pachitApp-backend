import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException, ParseUUIDPipe, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entity/usuario.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { use } from 'passport';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { Peticion } from './entity/peticion.entity';
import { CreatePeticionDto } from './dto/create-peticion.dto';
import { CreateSolicitudAdopcionDto } from './dto/create-solicitud.dto';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { SolicitudAdopcion } from 'src/mascota/entities/solicitud-adopcion.entity';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { Ubicacion } from './entity/ubicacion.entity';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    @InjectRepository(Organizacion)
    private readonly organizacionRepository: Repository<Organizacion>,
    @InjectRepository(Peticion)
    private readonly peticionRepository: Repository<Peticion>,
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(SolicitudAdopcion)
    private readonly solicitudAdopcionRepository: Repository<SolicitudAdopcion>
  ) {}



  async create(createUserDto: CreateUserDto) {
    try {
   
      const user =  this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return user; 

    } catch (error) {
      this.handleDBExceptions(error);
    }
    return this.userRepository.save(createUserDto);
  }

    //get all users
    findAll(paginationDto: PaginationDto) {       
      //limite que establecemos para paginacion
      const {limit=10, offset=0} = paginationDto

      return this.userRepository.find({
        take: limit,
        skip: offset,

        });
      }


    //getbyId
    async findOne(term: string) {

      let usuario: Usuario;

      //aqui se hace la validacion para ver por donde busca
      if( isUUID(term) ){
        usuario = await this.userRepository.findOneBy({idusuario: term});
      }else{
        const queryBuilder = this.userRepository.createQueryBuilder();
        usuario = await queryBuilder
          .where('nombre = :nombre',{
            nombre: term,
          }).getOne();
      }
      
      if(!usuario) 
        throw new NotFoundException('El usuario no fue encontrado');
      return usuario;


    }

    //delete
    async remove(idusuario: string){
      const user = await this.findOne(idusuario);

      await this.userRepository.remove(user);

    } 
    

    //Lo que hace es buscar todas las propiedas y hacer un update
    async update(idusuario: string, updateUserDto: UpdateUserDto) {

      const user = await this.userRepository.preload({
        idusuario: idusuario, 
        ...updateUserDto
      });

      if( !user ) throw new NotFoundException(`Usuario con id: ${idusuario} not found`);


      try {
        await this.userRepository.save(user);
        return user;
        
      } catch (error) {
        this.handleDBExceptions(error);
      }


      await this.userRepository.save(user);
    
      return user;
    }

    private handleDBExceptions(error:any){
      if(error.code == '23505')
        throw new BadRequestException(error.detail);

      this.logger.error(error)
      throw new InternalServerErrorException('Uncexpected error, chech server logs');

    }

    //CREA ORGANIZACION sin verificacion
    async  createOrganizacion(organizacion:CreateOrganizacionDto){
      try {
        const {idusuario} = organizacion;
        const [validateStatus] = await this.peticionRepository.find({
          where:{
            usuario: { idusuario : idusuario} 
          }
         
        });

     
    
        if(!validateStatus.estatus) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'Usuario aún no tiene permiso para ser organización',
          };
        }
    
        //Busca el id del usuario para ver si le puede asociar una organización
        const userFound = await this.userRepository.findOne({
          where:{
            idusuario,
          },
        });
    
        if(!userFound) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'No se encuentra el usuario',
        };
        }
    
        const orgFound = await this.organizacionRepository.findOne({
          where: {
            usuario: userFound,
          },
        });
    
        if (orgFound) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'El usuario ya tiene una organización asociada',
        };
        }
    
        const newOrganizacion = this.organizacionRepository.create({
          ...organizacion,
          usuario: userFound,
        });

        newOrganizacion.linkFacebook = validateStatus.linkFacebook;
        newOrganizacion.linkInstagram = validateStatus.linkInstagram;
        newOrganizacion.linkWeb = validateStatus.linkWeb;

        console.log(newOrganizacion);
    
        return this.organizacionRepository.save(newOrganizacion);
      } catch (error) {
  
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Please check server logs',
        };
     }
    }


    async verificaStatus(idPeticion : string){
      try {
        const result =  await this.peticionRepository.findOne({
          where : {
            idPeticion
          }
        });

        const { estatus } = result; 

        return estatus;

      } catch (error) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Por favor llama a un adulto',
      };
        
      }
    }



    // Manda peticion UpgradeOrganizacion
    async upgradeOrganizacion(peticion: CreatePeticionDto) {
      
      try {
          const {idusuario} = peticion; 
          const userFound = await this.userRepository.findOne({
              where: {
                  idusuario,
              },
          });

          if (!userFound) {
            throw new NotFoundException('User not found');

          }

          const peticionFound = await this.peticionRepository.findOne({
              where: {
                  usuario: userFound,
              },
          });

          if (peticionFound) {
              return {
                  status: HttpStatus.UNAUTHORIZED,
                  message: 'Los usuarios solo pueden tener una petición en proceso',
              };
          }

          const newPeticion = this.peticionRepository.create({
              ...peticion,
              usuario: userFound,
          });

          return this.peticionRepository.save(newPeticion);
      } catch (error) {
        console.log(error);
          return {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Please check server logs',
          };
      }
    }

    //Solicita la adopcion de una mascota
    async soliciutdAdopcion(solicitud:CreateSolicitudAdopcionDto){
      try {

        //Una vez encontrado el usuario
        const userFound = await this.userRepository.findOne({
            where: {
                idusuario:solicitud.usuario
            },
        });

        if (!userFound) {
          throw new NotFoundException('User not found');

        }

        //Una vez encontrada la mascota que esta en adopcion
        const mascotaFound = await this.mascotaRepository.findOne({
            where: {
                id: solicitud.mascota,
                estatus:1
            },
        });

        if (!mascotaFound) {
            return {
                status: HttpStatus.UNAUTHORIZED,
                message: 'Mascota not found or Mascota not avaliable for adopt',
            }; 
        }

        

        //Busca por una solicitud con ese usuario y estatus = 1(en proceso)
        const solicitudFound = await this.solicitudAdopcionRepository.findOne({
          where: {
            usuario: userFound,
            estatus: 1
          },
        })

        //Verifica que no exista esa solicitud, ya que los usuarios solo pueden tener una solicitud en proceso.
        if (solicitudFound) {
          return {
              status: HttpStatus.UNAUTHORIZED,
              message: 'Los usuarios solo pueden tener una solicitud en proceso',
          }; 
        }


        const newSolicitud = this.solicitudAdopcionRepository.create({
            ...solicitud,
            estatus:1,
            usuario: userFound,
            mascota:mascotaFound
        });

        return this.solicitudAdopcionRepository.save(newSolicitud);

    } catch (error) {
      console.log(error);
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Please check server logs',
        };
    }
    }

    //Crear ubicacion de el usuario
    async creaUbicacion(ubicacion:CreateUbicacionDto){
      try {

        //Una vez encontrado el usuario
        const userFound = await this.userRepository.findOne({
            where: {
                idusuario:ubicacion.usuario_idusuario
            },
        });

        if (!userFound) {
          throw new NotFoundException('User not found');

        }
        

        //Busca por una solicitud con ese usuario y estatus = 1(en proceso)
        const solicitudFound = await this.ubicacionRepository.findOne({
          where: {
            usuario: userFound
          },
        })

        //Verifica que no exista esa solicitud, ya que los usuarios solo pueden tener una solicitud en proceso.
        if (solicitudFound) {
          return {
              status: HttpStatus.UNAUTHORIZED,
              message: 'Los usuarios solo pueden tener una ubicación',
          }; 
        }


        const newUbicacion = this.ubicacionRepository.create({
            ...ubicacion,
            usuario: userFound,
        });

        return this.ubicacionRepository.save(newUbicacion);

    } catch (error) {
      console.log(error);
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Please check server logs',
        };
    }
    }

    //get all ubicaciones por usuario
    async findOndeUserUbicacion(term:string) {       
      
      

      //aqui se hace la validacion para ver por donde busca
      if( isUUID(term) ){


        const userFound = await this.userRepository.findOne({
          where:{
            idusuario:term
          }
        });

        const ubicacionFound = await this.ubicacionRepository.findOne({
          where : {
          usuario: userFound
          }
        });

        return ubicacionFound;

      }
    
    }  
      



}