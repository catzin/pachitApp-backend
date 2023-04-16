import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagenes } from '../mascota/entities/imagenes.entity';
import { OrganizacionModule } from 'src/organizacion/organizacion.module';


@Module({
  controllers: [FilesController],
  providers: [FilesService], // Add the OrganizacionRepository to the providers array
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Imagenes]),
    OrganizacionModule // Import the module containing the OrganizacionRepository
  ],
  exports:[TypeOrmModule.forFeature([Imagenes])]
})
export class FilesModule {}