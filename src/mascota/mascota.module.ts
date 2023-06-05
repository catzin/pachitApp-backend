import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Caracteristica } from './entities/caracteristica.entity';
import { TipoMascota } from './entities/tipo-mascota.entity';
import { TipoRaza } from './entities/tipo-raza.entity';
import { NivelActividad } from './entities/nivel-actividad.entity';
import { SolicitudAdopcion } from './entities/solicitud-adopcion.entity';
import { MascotaFavorita } from './entities/mascota-favorita.entity';
import { Adopcion } from './entities/adopcion.entity';
//import { MascotaImagenn } from './entities/mascotaImg.entity';
import { MascotaService } from './mascota.service';
import { Usuario } from 'src/user/entity/usuario.entity';
import { MascotaController } from './mascota.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TiempoSeguimiento } from './entities/tiempo-seguimiento';


@Module({
    imports: [AuthModule,TypeOrmModule.forFeature([Organizacion,Mascota,Caracteristica,TipoMascota,TipoRaza,NivelActividad,SolicitudAdopcion,MascotaFavorita,Adopcion,Usuario,SolicitudAdopcion,Organizacion,TiempoSeguimiento])],
    exports: [TypeOrmModule.forFeature([Organizacion,Mascota,Caracteristica,TipoMascota,TipoRaza,NivelActividad,SolicitudAdopcion,MascotaFavorita,Adopcion,TiempoSeguimiento])],
    providers: [MascotaService],
    controllers: [MascotaController]


})
export class MascotaModule {}
