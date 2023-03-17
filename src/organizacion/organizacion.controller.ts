import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrganizacionService } from './organizacion.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';

@Controller('organizacion')
export class OrganizacionController {

    constructor(private organizacionService: OrganizacionService) {}
  
    //Obtiene organizaciones con un limit y offset
    @Get('vertodas')
    // @SetMetadata('roles',[1,2])
    // @UseGuards(AuthGuard(), UserRoleGuard)
    findAll(@Query() paginationDto:PaginationDto) {
      return this.organizacionService.findAll(paginationDto);
    }

    //Obtiene todas las mascotas de la organización
    @Get(':idorganizacion/mascotas')
    findAllMascotas(
    @Param('idorganizacion') idorganizacion: string, 
    @Query() paginationDto: PaginationDto) {
        return this.organizacionService.findMascotasbyOrganizacion(idorganizacion,paginationDto);
    }


      
    //Crea mascota
    @Post(':idorganizacion/mascota')
    async createMascota(
    @Param('idorganizacion') idorganizacion:string,
    @Body() createMascotaDto: CreateMascotaDto
    ){
      const result= await this.organizacionService.createMascota(idorganizacion,createMascotaDto);
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
