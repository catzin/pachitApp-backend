import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Peticion } from './entity/peticion.entity';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { SolicitudAdopcion } from 'src/mascota/entities/solicitud-adopcion.entity';
import { Ubicacion } from './entity/ubicacion.entity';
import { HorarioContacto } from './entity/horario-contacto.entity';
import { MascotaFavorita } from 'src/mascota/entities/mascota-favorita.entity';
import { S3Module } from 'src/s3/s3.module';
import { Referencia } from './entity/referencia.entity';
import { RelationShip } from 'src/catalogs/entities/relationShip.entity';
import { Firma } from './entity/firma.entity';
import { Domicilio } from './entity/domicilio.entity';
import { Documento } from './entity/documento.entity';
import { Adopcion } from 'src/mascota/entities/adopcion.entity';
import { Imagenes } from 'src/mascota/entities/imagenes.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([Usuario,Organizacion,Peticion,Mascota,SolicitudAdopcion,Ubicacion,HorarioContacto,MascotaFavorita,Referencia,RelationShip,Firma,Documento,Domicilio,Adopcion,Imagenes]),AuthModule, S3Module],
  exports: [UserService,TypeOrmModule,TypeOrmModule.forFeature([Adopcion])],
  
})
export class UserModule {}
