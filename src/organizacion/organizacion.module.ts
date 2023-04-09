import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaImagen } from 'src/mascota/entities/mascota-imagen.entity';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { Organizacion } from './entitites/organizacion.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Mascota,MascotaImagen,Organizacion])],
    exports: [TypeOrmModule.forFeature([Mascota,MascotaImagen,Organizacion])]


})
export class OrganizacionModule {}
