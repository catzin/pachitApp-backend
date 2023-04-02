import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Usuario } from './user/entity/usuario.entity';
import { AuthModule } from './auth/auth.module';

import { CommonModule } from './common/common.module';
import { Organizacion } from './organizacion/entitites/organizacion.entity';
import { Peticion } from './user/entity/peticion.entity';
import { MascotaModule } from './mascota/mascota.module';
import { Mascota } from './mascota/entities/mascota.entity';
import { MascotaImagen } from './mascota/entities/mascota-imagen.entity';
import { OrganizacionController } from './organizacion/organizacion.controller';
import { OrganizacionService } from './organizacion/organizacion.service';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Caracteristica } from './mascota/entities/caracteristica.entity';



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
      Organizacion,Peticion,Mascota,MascotaImagen,Caracteristica],
      synchronize: true,
    }),
    AuthModule,
    // CatalogsModule,
    CommonModule,
    MascotaModule,
    OrganizacionModule,
    MascotaImagen,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      })

    ],
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
})
export class AppModule {}
