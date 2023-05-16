import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/user/entity/usuario.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
    controllers: [AuthController],
    imports: [ConfigModule,PassportModule,  
        TypeOrmModule.forFeature([Usuario]),
        
        PassportModule.register({defaultStrategy: 'jwt'}),
    
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: (configService: ConfigService) => {
                // console.log('JWT Secret',configService.get('JWT_SECRET'));
                // console.log('JWT SECRET',process.env.JWT_SECRET);
                return{
                    secret: process.env.JWT_SECRET,
                    signOptions:{
                    expiresIn:'1d' 
                    }
                }
            }
        })

    ],
    exports: [TypeOrmModule,JwtStrategy, PassportModule, JwtModule,TypeOrmModule.forFeature([Usuario])],
    providers: [AuthService,JwtStrategy,GoogleStrategy]
})
export class AuthModule {
}
