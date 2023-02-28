import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth.constant';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers: [AuthController],
    imports: [UserModule,  PassportModule, 
        JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '60s'},
    })],
    providers: [AuthService, LocalStrategy,JwtStrategy]
})
export class AuthModule {
}
