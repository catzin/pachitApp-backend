import { Body, Controller, Get, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { MascotaService } from './mascota.service';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { ChangeEstatusMascotaDto } from './dto/change-estatus-mascota.dto';
import { ChangeEstatusSolicitudDto } from './dto/change-estatus-solicitud.dto';

@Controller('mascota')
export class MascotaController {
    constructor(private readonly mascotaService: MascotaService) {}

    //Acepta la adopcion de sus mascotas por organizacion
    @Post('adopcion')
    // @SetMetadata('roles','organizacion')
    // @UseGuards(AuthGuard(), UserRoleGuard)
    async createAdopcion(@Body() createAdopcionDto: CreateAdopcionDto) {
      return this.mascotaService.createAdopcion(createAdopcionDto);
    }

    //Cambia estatus de mascotas para adoptar
    @Patch('estatus')
    @SetMetadata('roles','organizacion')
    @UseGuards(AuthGuard(), UserRoleGuard)
    async change(@Body() changeEstatusMascotaDto: ChangeEstatusMascotaDto) {
      return this.mascotaService.cambiaEstatusMascota(changeEstatusMascotaDto);
    }

      // Ruta protegida que requiere autenticación
    @Get('protegida')
    @SetMetadata('roles','organizacion')
    @UseGuards(AuthGuard(), UserRoleGuard)
    async rutaProtegida() {
      return 'Ruta protegida para mascotas';
    }

    //Cambia estatus de solicitudes para adoptar
    @Patch('solicitud')
    @SetMetadata('roles','organizacion')
    @UseGuards(AuthGuard(), UserRoleGuard)
    async changeSolicitud(@Body() changeEstatusSolicitudDto: ChangeEstatusSolicitudDto) {
      return this.mascotaService.cambiaEstatusSolicitudes(changeEstatusSolicitudDto);
    }

    

}
