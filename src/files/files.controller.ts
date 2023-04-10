import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res, Header, StreamableFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { createReadStream } from 'fs';
import { ConfigService } from '@nestjs/config';
import { CreateImagenDto } from './dto/create-imagen.dto';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,

    
  ) {}

  // @Get(':mascota/:imageName')
  // findOneImage(
  // @Res() res: Express.Response,
  // @Param('imageName') imageName: string
  // ){

  //   const path = this.filesService.getStaticMascotaImg(imageName);

    
  //   res.status(403).json({})
  // }

  @Get('mascota/:imageName')
  @Header('Content-Type', 'image/jpeg')
  findProductImage(@Param('imageName') imgName: string) {
    const stream = createReadStream(this.filesService.getStaticMascotaImg(imgName));    
    return new StreamableFile(stream);
  }
  
 
 
  @Post('mascota/:idMascota')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    //limits: {fileSize:1000}
    storage: diskStorage({
      destination: './static/mascotas', //aqui va la imagen donde ira en este caso la carpeta que creamos
      filename: fileNamer
    })
  }))  
  uploadMascotaImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('idMascota') idMascota:number,
    @Body() createImagenDto: CreateImagenDto
    ){

      if(!file){
        throw new BadRequestException('El archivo no es valido');
      }
      
      const secureURL = `${this.configService.get('HOST_API')}/files/mascota/${file.filename}`;
      const newImagen = this.filesService.createImagen(idMascota,createImagenDto,secureURL)
    return {
      secureURL
    };
  }

}
