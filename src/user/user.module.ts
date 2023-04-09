import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Peticion } from './entity/peticion.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService,TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Usuario,Organizacion,Peticion]),AuthModule],
  
})
export class UserModule {}
