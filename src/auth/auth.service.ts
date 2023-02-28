import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/user/entity/usuario.entity';
//import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

    constructor(
        //@InjectRepository(Usuario)
        //private readonly userRepository: Repository<Usuario>,
        private userService: UserService,
        private jwtService: JwtService,
      ) {}

      async validateUser(correo:string,contrasena:string){
        const user= await this.userService.findByCorreo(correo);
    
        console.log(`validateUser: correo=${correo}, contrasena=${contrasena}, user=${JSON.stringify(user)}`);
    
        if(user && user.contrasena === contrasena){
            return user; 
        }
    
        return null; //contrasena doesn't match
    }


    async login(user: any) {
        if (!user || !user.correo) {
          throw new Error('Invalid user object or missing correo property');
        }
      
        const payload = { correo: user.correo, sub: user.idusuario };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

    // async create(createUserDto: CreateUserDto){
      
    //   try {
    //     const user = this.userRepository.create(createUserDto);

    //     await this.userRepository.save(user)

    //     return user;


    //   } catch (error) {
    //     console.log(error);
        
    //   }
      
    // }
}


