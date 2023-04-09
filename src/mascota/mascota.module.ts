import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity';
import { MascotaImagen } from './entities/mascota-imagen.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Caracteristica } from './entities/caracteristica.entity';
import { TipoMascota } from './entities/tipo-mascota.entity';
import { TipoRaza } from './entities/tipo-raza.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Organizacion,Mascota,MascotaImagen,Caracteristica,TipoMascota,TipoRaza])],
    exports: [TypeOrmModule.forFeature([Organizacion,Mascota,MascotaImagen,Caracteristica,TipoMascota,TipoRaza])]


})
export class MascotaModule {}
