import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService,TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Usuario]),AuthModule],
  

})
export class UserModule {}
