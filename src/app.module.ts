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



@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'pachidb.cmikwqtsgxlj.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'pachiAdopcion',
      entities: [Usuario,//civilState,Sex,UserType,Ocupation,Residence,RelationShip,
      //DocumentType,
      Organizacion,Peticion,Mascota,Caracteristica,TipoDocumento,Imagenes,TipoMascota,TipoRaza,NivelActividad,SolicitudAdopcion],
      synchronize: true,
    }),
    AuthModule,
    // CatalogsModule,
    CommonModule,
    MascotaModule,
    OrganizacionModule,
    //MascotaImagen,
    MulterModule.register({
      dest: './public/mascotas'
    })

  ],
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
})
export class AppModule {}
