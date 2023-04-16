import { Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, Param, Patch, Post, Query, SetMetadata, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrganizacionService } from './organizacion.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';



const config: S3ClientConfig = {
  region: process.env.BUCKET_REGION ,
  credentials: {
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
  },
};
const s3 = new S3Client(config);

@Controller('organizacion')
export class OrganizacionController {

  constructor(private organizacionService: OrganizacionService) { }

  //Obtiene organizaciones con un limit y offset
  @Get('vertodasOrganizaciones')
  // @SetMetadata('roles',[1,2])
  // @UseGuards(AuthGuard(), UserRoleGuard)
  findAllOrganizaciones(@Query() paginationDto: PaginationDto) {
    return this.organizacionService.findAllOrganicaciones(paginationDto);
  }

  // @SetMetadata('roles',[1,2])
  // @UseGuards(AuthGuard(), UserRoleGuard)

  //Obtiene mascotas con un limit y offset
  @Get('vertodasMascotas')
  findAllMascotas(
    @Query() paginationDto: PaginationDto,
    @Query('tipoMascota') tipoMascota?: number,
  ) {
    return this.organizacionService.findAllMascotas(paginationDto);
  }

  //Obtiene mascotas por TIPO MASCOTA con un limit y offset -- Catalogo1
  @Get('vertodasMascotasByTipo')
  findAllMascotasbyTipo(
    @Query() paginationDto: PaginationDto,
    @Query('tipoMascota') tipoMascota?: number,
  ) {
    return this.organizacionService.findAllMascotasByTipo(paginationDto, tipoMascota);
  }

  //Obtiene mascotas por TIPO RAZA con un limit y offset -- Catalogo1
  @Get('vertodasMascotasByRaza')
  findAllMascotasbyRaza(
    @Query() paginationDto: PaginationDto,
    @Query('tipoRaza') tipoRaza?: number,
  ) {
    return this.organizacionService.findAllMascotasByRaza(paginationDto, tipoRaza);
  }

  //Obtiene mascotas por NIVEL ACTIVIDAD con un limit y offset -- Catalogo1
  @Get('vertodasMascotasByNivel')
  findAllMascotasbyNivel(
    @Query() paginationDto: PaginationDto,
    @Query('nivelActividad') nivelActividad?: number,
  ) {
    return this.organizacionService.findAllMascotasByNivel(paginationDto, nivelActividad);
  }

  //Obtiene todas las mascotas de la organización
  @Get(':idorganizacion/mascotas-organizacion')
  findAllMascotasxOrganizacion(
    @Param('idorganizacion') idorganizacion: string,
    @Query() paginationDto: PaginationDto) {
    return this.organizacionService.findMascotasbyOrganizacion(idorganizacion, paginationDto);
  }

  //Obtiene la mascota por id
  @Get(':id/mascota')
  findMascotabyId(
    @Param('id') id: number,
    @Query() paginationDto: PaginationDto) {
    return this.organizacionService.findMascotasbyId(id);
  }

  //Actualiza la mascota por id con o sin imagenes
  @Patch(':id/mascota')
  updateMascota(
    @Param('id') id: number,
    @Body() updateMascotaDto: UpdateMascotaDto
  ) {
    return this.organizacionService.updateMascota(id, updateMascotaDto);
  }

  //Elimina una mascota por id
  @Delete(':id/mascota/delete')
  deleteMascota(
    @Param('id') id: number) {
    this.organizacionService.deleteMascota(id);
  }

  //Crea mascota
  //multer local
  /*storage : diskStorage({
      destination: './public/mascotas',
      filename: (req,file,cb) =>{
        return cb(null, `${file.originalname}`);
      }
    }),*/
  @Post('creaMascota/:idorganizacion')
  @UseInterceptors(FilesInterceptor('fotos', 5, {
    storage: multerS3({
      s3: s3,
      bucket: "pachistorage",
      acl: '',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const filename = uuidv4();
        cb(null, `${filename}.${ext}`);
      },

    })
  }

  ))
  async createMascota(
    @Param('idorganizacion') idorganizacion: string,
    @Body() createMascotaDto: CreateMascotaDto,
    @UploadedFiles() fotos
  ): Promise<{ status: HttpStatus; message: string; }> {

    const newPet: CreateMascotaDto = {
      nombre: createMascotaDto.nombre,
      descripcion: createMascotaDto.descripcion,
      edad: Number(createMascotaDto.edad),
      idtipoMascota: Number(createMascotaDto.idtipoMascota),
      idtipoRaza: Number(createMascotaDto.idtipoRaza),
      idnivelActividad: Number(createMascotaDto.idnivelActividad),
      sexo: createMascotaDto.sexo,
      estatus: Number(createMascotaDto.estatus),
      caracteristicas: createMascotaDto.caracteristicas.map((e) => Number(e))

    }

    const result = await this.organizacionService.createMascota(idorganizacion, newPet, fotos);
    if ('message' in result) {
      throw new InternalServerErrorException(result.message);
    } else if (!result) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Organizacion not found',
      };
    }
    return {
      status: HttpStatus.CREATED,
      message: 'Mascota created successfully',
    };
  }





}


