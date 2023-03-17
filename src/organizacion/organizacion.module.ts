import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaImage } from 'src/mascota/entities/mascota-image.entity';
import { Mascota } from 'src/mascota/entities/mascota.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Mascota,MascotaImage])],
    exports: [TypeOrmModule.forFeature([Mascota,MascotaImage])]


})
export class OrganizacionModule {}
