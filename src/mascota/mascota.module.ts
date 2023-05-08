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
//import { MascotaImagenn } from './entities/mascotaImg.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Organizacion,Mascota,Caracteristica,TipoMascota,TipoRaza,NivelActividad,SolicitudAdopcion,MascotaFavorita])],
    exports: [TypeOrmModule.forFeature([Organizacion,Mascota,Caracteristica,TipoMascota,TipoRaza,NivelActividad,SolicitudAdopcion,MascotaFavorita])]


})
export class MascotaModule {}
