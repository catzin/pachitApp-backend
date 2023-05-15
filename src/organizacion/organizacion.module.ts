import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { Organizacion } from './entitites/organizacion.entity';
import { Imagenes } from 'src/mascota/entities/imagenes.entity';
import { Recordatorio } from './entitites/recordatorio.entity';
import { PetAge } from 'src/catalogs/entities';



@Module({
    imports: [TypeOrmModule.forFeature([Mascota,Organizacion,Imagenes,Recordatorio,PetAge])],
    exports: [TypeOrmModule.forFeature([Mascota,Organizacion,Imagenes,Recordatorio,PetAge])]


})
export class OrganizacionModule {}
