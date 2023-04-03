import { Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, Param, Patch, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrganizacionService } from './organizacion.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';

@Controller('organizacion')
export class OrganizacionController {

    constructor(private organizacionService: OrganizacionService) {}
  
    //Obtiene organizaciones con un limit y offset
    @Get('vertodasOrganizaciones')
    // @SetMetadata('roles',[1,2])
    // @UseGuards(AuthGuard(), UserRoleGuard)
    findAllOrganizaciones(@Query() paginationDto:PaginationDto) {
      return this.organizacionService.findAllOrganicaciones(paginationDto);
    }

    // @SetMetadata('roles',[1,2])
    // @UseGuards(AuthGuard(), UserRoleGuard)

    //Obtiene mascotas con un limit y offset
    @Get('vertodasMascotas')
    findAllMascotas(
    @Query() paginationDto:PaginationDto,
    @Query('tipoMascota') tipoMascota?: number,
    ) {
      return this.organizacionService.findAllMascotas(paginationDto);
    }    

    @Get('vertodasMascotasByTipo')
    findAllMascotasbyTipo(
    @Query() paginationDto:PaginationDto,
    @Query('tipoMascota') tipoMascota?: number,
    ) {
      return this.organizacionService.findAllMascotasByTipo(paginationDto,tipoMascota);
    }   

    //Obtiene todas las mascotas de la organización
    @Get(':idorganizacion/mascotas-organizacion')
    findAllMascotasxOrganizacion(
    @Param('idorganizacion') idorganizacion: string, 
    @Query() paginationDto: PaginationDto) {
        return this.organizacionService.findMascotasbyOrganizacion(idorganizacion,paginationDto);
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
    )
    {
        return this.organizacionService.updateMascota(id,updateMascotaDto);
    }   

    //Elimina una mascota por id
    @Delete(':id/mascota/delete')
    deleteMascota(
    @Param('id') id: number)
    {
        this.organizacionService.deleteMascota(id);
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
