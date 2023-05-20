import { Module, forwardRef } from '@nestjs/common';
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
import { Ocupation, Residence, Sex, civilState } from 'src/catalogs/entities';

@Module({
    controllers: [AuthController],
    imports: [ConfigModule,PassportModule,forwardRef(() => UserModule), 
        TypeOrmModule.forFeature([Usuario,civilState,Sex,Ocupation,Residence]),
        
        PassportModule.register({defaultStrategy: 'jwt'}),
    
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: (configService: ConfigService) => {
                // console.log('JWT Secret',configService.get('JWT_SECRET'));
                // console.log('JWT SECRET',process.env.JWT_SECRET);
                const expiresInSeconds = 30 * 24 * 60 * 60; // 30 días en segundos
                return{
                    secret: process.env.JWT_SECRET,
                    signOptions:{
                    expiresIn:expiresInSeconds
                    }
                }
            }
        }),


    ],
    exports: [TypeOrmModule,JwtStrategy, PassportModule, JwtModule],
    providers: [AuthService,JwtStrategy,GoogleStrategy]
})
export class AuthModule {
}
