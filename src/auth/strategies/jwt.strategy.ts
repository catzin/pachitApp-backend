import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Usuario } from '../entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>,
        configService: ConfigService,
        ){
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

        });
    }

    //Este metodo se va a llamar si el JWT no ha expirado
    //y si la firma de JWT hace match con el payload
    async validate(payload: JwtPayload): Promise<Usuario>{
        //Extraemos el correo electronico
        const {idusuario} = payload;

        const user = await this.userRepository.findOneBy({idusuario});

        if(!user)
            throw new UnauthorizedException('Token not valid')

        if(!user.isactive)
            throw new UnauthorizedException('User is inactive')


        console.log({user});
        
        return user;
    }

}