import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { Organizacion } from './entitites/organizacion.entity';
import { Imagenes } from 'src/mascota/entities/imagenes.entity';



@Module({
    imports: [TypeOrmModule.forFeature([Mascota,Organizacion,Imagenes])],
    exports: [TypeOrmModule.forFeature([Mascota,Organizacion,Imagenes])]


})
export class OrganizacionModule {}
