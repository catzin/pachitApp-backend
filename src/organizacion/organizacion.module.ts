import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaImagen } from 'src/mascota/entities/mascota-imagen.entity';
import { Mascota } from 'src/mascota/entities/mascota.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Mascota,MascotaImagen])],
    exports: [TypeOrmModule.forFeature([Mascota,MascotaImagen])]


})
export class OrganizacionModule {}
