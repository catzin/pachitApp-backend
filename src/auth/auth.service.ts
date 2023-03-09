import { HttpException, HttpStatus, Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { QueryFailedError, Repository } from 'typeorm';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>,

        private readonly jwtService: JwtService
        // ,private userService: UserService,
        // private jwtService: JwtService,
      ) {}

      async create(createUserDto: CreateUserDto){
      
        try {

          const {correo,contrasena, ...userData} = createUserDto;


          const existingUser = await this.userRepository.findOne({
            where: { correo },
            select: { correo: true },
          });
          
          if (existingUser) {
            throw  new BadRequestException('Correo electronico en uso');
          }

          //Encripta la contraseña
          const user = this.userRepository.create({
            ...userData,
            contrasena: bcrypt.hashSync(contrasena, 10),
            correo: correo

          });
  
          await this.userRepository.save(user)
          delete user.contrasena;

          
        return {
          ...user,
          token: this.getJwtToken({idusuario: user.idusuario})
        };
  
  
        } catch (error) {
         this.handleDBErrors(error);
          
        }
        
      }


      async login(loginUserDto:LoginUserDto){



        const {contrasena, correo} = loginUserDto; //Como extraer y trabajar con caractesticas del DTO

        const user = await this.userRepository.findOne({

          where: {correo},
          select: {correo: true, contrasena:true, idusuario: true}
        });

        if(!user)
          throw new UnauthorizedException('Not valid credentials (email)')

        if(!bcrypt.compareSync(contrasena, user.contrasena))
          throw new UnauthorizedException('Not valid credentials (password)')

        return {
          ...user,
          token: this.getJwtToken({idusuario: user.idusuario})
        };
        //Retornar el jwt

      }

      private getJwtToken(payload: JwtPayload){
        
        const token = this.jwtService.sign(payload);
        return token;

      }


      private handleDBErrors(error: any): never{
        if(error.code == '23505')
          throw new BadRequestException(error.detail);
        
        console.log(error);

        throw new InternalServerErrorException('PLease check server logs');
        
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


