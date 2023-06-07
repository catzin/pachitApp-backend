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
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Referencia } from './user/entity/referencia.entity';
import { Firma } from './user/entity/firma.entity';
import { Domicilio } from './user/entity/domicilio.entity';
import { Documento } from './user/entity/documento.entity';
import { Adopcion } from './mascota/entities/adopcion.entity';
import { TiempoSeguimiento } from './mascota/entities/tiempo-seguimiento';
import { MascotaService } from './mascota/mascota.service';
import { AppService } from './app.service';
import { Seguimiento } from './mascota/entities/seguimiento.entity';
import { ImagenSeguimiento } from './user/entity/imagen-seguimiento.entity';
import { incidente } from './mascota/entities/incidente.entity';



@Module({
  imports: [
    MailerModule.forRoot({
      transport:{
        host:'smtp.gmail.com',
        auth:{
          user:'pachidevelopers@gmail.com',
          pass:'xelqkoocqbqkbzcb'
        },
      }
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'pachibase.cux10ohgatma.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'm9IkWP47PjXDFwwS1LyS',
      database: 'pachiDB',
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
        Referencia,
        MascotaFavorita,
        Firma,
        Documento,
        Domicilio,     
        MascotaFavorita,
        Adopcion,
        TiempoSeguimiento,
        Seguimiento,
        ImagenSeguimiento,
        Domicilio,
        incidente
      ],
      synchronize: true
    }),
    
    AuthModule,
    CatalogsModule,
    CommonModule,
    MascotaModule,
    OrganizacionModule,
    S3Module,
    ConfigModule

  ],
  controllers: [OrganizacionController, GoogleController],
  providers: [
    OrganizacionService,
    S3Service,
    UserService,
    GoogleService,
    MascotaService,
    AppService  ],
  exports:[UserModule,UserService]
     

})
export class AppModule {}
