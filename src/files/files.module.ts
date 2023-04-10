import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagenes } from './entities/imagenes.entity';
import { OrganizacionModule } from 'src/organizacion/organizacion.module';
import { MascotaImagenn } from 'src/mascota/entities/mascotaImg.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService], // Add the OrganizacionRepository to the providers array
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Imagenes,MascotaImagenn]),
    OrganizacionModule // Import the module containing the OrganizacionRepository
  ],
  exports:[TypeOrmModule.forFeature([Imagenes,MascotaImagenn])]
})
export class FilesModule {}