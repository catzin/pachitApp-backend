import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Usuario } from './user/entity/usuario.entity';
import { AuthModule } from './auth/auth.module';

import { CommonModule } from './common/common.module';
import { Organizacion } from './organizacion/entitites/organizacion.entity';



@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'pachidb.cmikwqtsgxlj.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'pachiDBTest',
      entities: [Usuario,//civilState,Sex,UserType,Ocupation,Residence,RelationShip,
      //DocumentType,
      Organizacion],
      synchronize: true,
    }),
    AuthModule,
    // CatalogsModule,
    CommonModule

    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
