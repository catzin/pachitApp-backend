import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity';
import { MascotaImagen } from './entities/mascota-imagen.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Caracteristica } from './entities/caracteristica.entity';
import { TipoMascota } from './entities/tipo-mascota.entity';
import { TipoRaza } from './entities/tipo-raza.entity';
import { NivelActividad } from './entities/nivel-actividad.entity';
import { MascotaImagenn } from './entities/mascotaImg.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Organizacion,Mascota,MascotaImagen,Caracteristica,TipoMascota,TipoRaza,NivelActividad,MascotaImagenn])],
    exports: [TypeOrmModule.forFeature([Organizacion,Mascota,MascotaImagen,Caracteristica,TipoMascota,TipoRaza,NivelActividad,MascotaImagenn])]


})
export class MascotaModule {}
