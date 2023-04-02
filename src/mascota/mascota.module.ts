import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity';
import { MascotaImagen } from './entities/mascota-imagen.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Caracteristica } from './entities/caracteristica.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Organizacion,Mascota,MascotaImagen,Caracteristica])],
    exports: [TypeOrmModule.forFeature([Organizacion,Mascota,MascotaImagen,Caracteristica])]


})
export class MascotaModule {}
