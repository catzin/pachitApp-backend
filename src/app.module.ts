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
import { OrganizacionController } from './organizacion/organizacion.controller';
import { OrganizacionService } from './organizacion/organizacion.service';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { Caracteristica } from './mascota/entities/caracteristica.entity';
import { TipoDocumento } from './files/entities/tipo-documento.entity';
import { Imagenes } from './mascota/entities/imagenes.entity';
import { TipoMascota } from './mascota/entities/tipo-mascota.entity';
import { TipoRaza } from './mascota/entities/tipo-raza.entity';
import { NivelActividad } from './mascota/entities/nivel-actividad.entity';
import { MulterModule } from '@nestjs/platform-express';
import { SolicitudAdopcion } from './mascota/entities/solicitud-adopcion.entity';
import { Ubicacion } from './user/entity/ubicacion.entity';
import { HorarioContacto } from './user/entity/horario-contacto.entity';
import { Recordatorio } from './organizacion/entitites/recordatorio.entity';
import { MascotaFavorita } from './mascota/entities/mascota-favorita.entity';
import { CatalogsModule } from './catalogs/catalogs.module';
import { civilState } from './catalogs/entities/civil-state.entity';
import { Sex } from './catalogs/entities/sex.entity';
import { UserType } from './catalogs/entities/user-type.entity';
import { Ocupation } from './catalogs/entities/ocupation.entity';
import { PetAge, Residence } from './catalogs/entities';
import { RelationShip } from './catalogs/entities/relationShip.entity';
import { DocumentType } from './catalogs/entities/document-entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './shared/timeout.interceptor';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';



@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'pachibase-1.c89xxzaf5mwy.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'Holamundo11!',
      database: 'pachiDBTest',
      entities: [
        Usuario, 
        civilState, 
        Sex,
        UserType, 
        Ocupation, 
        Residence, 
        RelationShip,
        DocumentType,
        Organizacion, 
        Peticion, 
        Mascota, 
        Caracteristica, 
        TipoDocumento, 
        Imagenes, 
        TipoMascota, 
        TipoRaza, 
        NivelActividad, 
        SolicitudAdopcion, 
        Ubicacion, 
        HorarioContacto, 
        Recordatorio,
        PetAge,
        MascotaFavorita],
      synchronize: false,
    }),
    
    AuthModule,
    CatalogsModule,
    CommonModule,
    MascotaModule,
    OrganizacionModule,
    S3Module,
    ConfigModule

  ],
  controllers: [OrganizacionController],
  providers: [
    OrganizacionService,
    S3Service,
    UserService
  ],
  exports:[UserModule,UserService]
     

})
export class AppModule {}

// @Module({
//   imports: [
//     UserModule,
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: '1998',
//       database: 'pachidbtest',
//       entities: [Usuario,//civilState,Sex,UserType,Ocupation,Residence,RelationShip,
//       //DocumentType,
//       Organizacion,Peticion,Mascota,Caracteristica,TipoDocumento,
//       Imagenes,TipoMascota,TipoRaza,NivelActividad,SolicitudAdopcion,
//       Ubicacion,HorarioContacto,Recordatorio,MascotaFavorita],
//       synchronize: true,
//     }),
//     AuthModule,
//     // CatalogsModule,
//     CommonModule,
//     MascotaModule,
//     OrganizacionModule,
//     //MascotaImagen,
//     MulterModule.register({
//       dest: './public/mascotas'
//     })

//   ],
//   controllers: [OrganizacionController],
//   providers: [OrganizacionService],
// })
// export class AppModule {}
