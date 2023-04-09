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

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    @InjectRepository(Organizacion)
    private readonly organizacionRepository: Repository<Organizacion>,
    @InjectRepository(Peticion)
    private readonly peticionRepository: Repository<Peticion>
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

    //get all
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

   findByCorreo(correo: string) {
    return this.userRepository.findOne({ where: { correo } });
    }

    private handleDBExceptions(error:any){
      if(error.code == '23505')
        throw new BadRequestException(error.detail);

      this.logger.error(error)
      throw new InternalServerErrorException('Uncexpected error, chech server logs');

    }

    async  deleteUsuariosWithEstadoCivilOne() {
      // const user = await this.findOne(idusuario);
    
      // Crear consulta personalizada para seleccionar los usuarios con id de estado civil igual a 2
      const query = this.userRepository
        .createQueryBuilder('usuario')
        .where('usuario.estadoCivil_idEstadoCivil = :idEstadoCivil', { idEstadoCivil: 1 });
    
      // Borrar los usuarios seleccionados
      const result = await query.delete().execute();
      console.log(result.affected); // imprime el número de usuarios eliminados
    }

    async deleteUsuariosWithSexoUno() {
      // Crear consulta personalizada para seleccionar los usuarios con id de sexo igual a 1
      const query = this.userRepository
        .createQueryBuilder('usuario')
        .where('usuario.sexo_idSexo = :idSexo', { idSexo: 1 });
      
      // Borrar los usuarios seleccionados
      const result = await query.delete().execute();
      console.log(result.affected); // imprime el número de usuarios eliminados
    }

    //CREA ORGANIZACION sin verificacion
    async createOrganizacion(idusuario: string, organizacion:CreateOrganizacionDto){
      try {
        const validateStatus = await this.peticionRepository.findOne({
          where: {
            usuario: { idusuario },
            estatus: true
          }
        });
    
        if(!validateStatus) {
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
    
        return this.organizacionRepository.save(newOrganizacion);
      } catch (error) {
        console.log(error); // Agrega este console.log()
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Please check server logs',
        };
     }
    }



  // Manda peticion UpgradeOrganizacion
  async upgradeOrganizacion(idusuario: string, peticion: CreatePeticionDto) {
    
    try {
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
      console.log(error); // Agrega este console.log()
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Please check server logs',
        };
    }
}




   private handleDBErrors(error: any): never{
    if(error.code == '23505')
      throw new BadRequestException(error.detail);
    
    console.log(error);

    throw new InternalServerErrorException('PLease check server logs');
    
  }

}