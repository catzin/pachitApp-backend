import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity';
import { MascotaImage } from './entities/mascota-image.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Organizacion,Mascota,MascotaImage])],
    exports: [TypeOrmModule.forFeature([Organizacion,Mascota,MascotaImage])]


})
export class MascotaModule {}
