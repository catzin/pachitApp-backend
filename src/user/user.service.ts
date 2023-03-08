import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entity/usuario.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { use } from 'passport';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
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
}