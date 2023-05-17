import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, LoginUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserType } from 'src/catalogs/entities';
import { Usuario } from 'src/user/entity/usuario.entity';



@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    private readonly jwtService: JwtService
    // ,private userService: UserService,
    // private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {
  
      const { correo, contrasena, ...userData } = createUserDto;


      const existingUser = await this.userRepository.findOne({
        where: { correo },
        select: { correo: true },
      });

      if (existingUser) {
        
        throw new BadRequestException('El correo ya está en uso');
      }
     
      const user = await this.userRepository.create({
        ...userData,
        contrasena: bcrypt.hashSync(contrasena, 10),
        correo: correo,
   

      });
      await this.userRepository.save(user)
      const {nombre,apellidoPaterno,apellidoMaterno,idusuario } = user;

      return {
        nombre, 
        apellidoPaterno,
        apellidoMaterno,
        correo,
        idusuario,
        token: this.getJwtToken({ idusuario: user.idusuario }),
        tipoUsuario_idTipoUsuario : 1
      };


    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }


  

  async login(loginUserDto: LoginUserDto) {

    const { contrasena, correo } = loginUserDto; //Como extraer y trabajar con caractesticas del DTO

    const user = await this.userRepository.findOne({
      where: { correo : correo },
      relations : ['tipoUsuario_idTipoUsuario'],
      
    });

  
    if (!user){
      throw new NotFoundException('User not found');
    }
     

    if (!bcrypt.compareSync(contrasena, user.contrasena)){
      throw new UnauthorizedException('Not valid credentials');
    }
     
    const{nombre,apellidoPaterno,apellidoMaterno,idusuario, tipoUsuario_idTipoUsuario} = user;
    
    return {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      idusuario,
      token: this.getJwtToken({ idusuario: user.idusuario }),
      tipoUsuario_idTipoUsuario
      
    };
    //Retornar el jwt

  }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }


  private handleDBErrors(error: any): never {
    if (error == '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('PLease check server logs');

  }


}


