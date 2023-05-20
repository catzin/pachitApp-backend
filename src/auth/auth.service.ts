import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, LoginUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserType } from 'src/catalogs/entities';
import { Usuario } from 'src/user/entity/usuario.entity';

import { CreateUserGoogleDto } from './dto/create-user-google.dto';
import { Ocupation, Residence, Sex, civilState } from 'src/catalogs/entities';
import { IsDateString } from 'class-validator';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    @InjectRepository(civilState)
    private readonly edoCivlRepository: Repository<civilState>,
    @InjectRepository(Sex)
    private readonly sexRepository: Repository<Sex>,
    @InjectRepository(Ocupation)
    private readonly ocupationRepository: Repository<Ocupation>,
    @InjectRepository(Residence)
    private readonly residenceRepository: Repository<Residence>,

    private readonly jwtService: JwtService
    // ,private userService: UserService,
    // private jwtService: JwtService,
  ) { }

  //CREATE
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
  

  //Logea un Usario
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

  //Login Google
  async loginGoogle(user: any):Promise<any> {


    
      //Regresa el token e info usuario
        if(user) {
            return {
                access_token: this.jwtService.sign({
                    user: user.id, sub: 1
                })
            }
        } else {
            return {
                access_token:''
               }
      }
  }

  async createCuentaGoogle(email: string, firstName: string, lastName: string, picture: string){
    try {


      const user = this.userRepository.create({
        correo: email,
        nombre:lastName,
        apellidoPaterno:firstName,
        fotoPerfil:picture,
        isactive:true
        
      });
  
      await this.userRepository.save(user);
  
      return {
        user
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
    


  //   async validateUser(correo:string,contrasena:string){
  //     const user= await this.userService.findByCorreo(correo);

  //     console.log(`validateUser: correo=${correo}, contrasena=${contrasena}, user=${JSON.stringify(user)}`);

  //     if(user && user.contrasena === contrasena){
  //         return user; 
  //     }

  //     return null; //contrasena doesn't match
  // }


  // async login(user: any) {
  //     if (!user || !user.correo) {
  //       throw new Error('Invalid user object or missing correo property');
  //     }

  //     const payload = { correo: user.correo, sub: user.idusuario };
  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   }


}


