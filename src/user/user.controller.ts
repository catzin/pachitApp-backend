import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    InternalServerErrorException,
    Param,
    ParseIntPipe,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    SetMetadata,
    UnauthorizedException,
    UseGuards,
  } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { UserService } from './user.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { CreatePeticionDto } from './dto/create-peticion.dto';
import { SolicitudAdopcion } from '../mascota/entities/solicitud-adopcion.entity';
import { CreateSolicitudAdopcionDto } from './dto/create-solicitud.dto';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { CreateLikeDto } from './dto/create-like.dto';
  
  @Controller('user')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Get()
    // @SetMetadata('roles',[1,2])
    // @UseGuards(AuthGuard(), UserRoleGuard)
    findAll(@Query() paginationDto:PaginationDto) {
      return this.userService.findAll(paginationDto);
    }

    @Get(':term')
    findOne(@Param('term') term: string) {
      return this.userService.findOne(term);
    }
  
    @Post()
    store(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }

    @Delete(':idusuario')
    deleteUser(@Param('idusuario', ParseUUIDPipe) idusuario: string) {
      return this.userService.remove(idusuario);
    } 


   
  
    @Patch(':idusuario')
    update(
    @Param('idusuario') idusuario: string,
    @Body() updateUserDto:UpdateUserDto){
      return this.userService.update(idusuario,updateUserDto);
    }
  
    //Crea organizacion
    // Funcion para desarrolladores: Crea una organizacion al usuario correspondietne
    @Post('creaOrganizacion')
    async createOrganizacion(
    @Body() createOrganizacionDto: CreateOrganizacionDto
    ){
      const result = await this.userService.createOrganizacion(createOrganizacionDto);
      if ('message' in result) {
        throw new InternalServerErrorException(result.message);
      } else if (!result) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
      }
      return {
        status: HttpStatus.CREATED,
        message: 'Organizacion created successfully',
      };
    }


    //Hace una peticion para ser organizacion
    @Post('peticion')
    async createPeticion(
      @Body() createPeticionDto: CreatePeticionDto,
    ) {
      const result = await this.userService.upgradeOrganizacion(createPeticionDto);
      if ('message' in result) {
        throw new UnauthorizedException(result.message);
      } else if (!result) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
      }
      return {
        status: HttpStatus.CREATED,
        id : result.idPeticion,
        message: 'Peticion creada satisfactoriamente',
      };
 
  }


    @Post('verificarStatus')
    async verificarStatus(
      @Body('idPeticion') idPeticion: string
    ) {
      const result = await this.userService.verificaStatus(idPeticion);

      return {
        status: HttpStatus.OK,
        accept: result
      };


    }

    @Post('solicitudAdopcion')
    async solicitudAdopcion(
      @Body() createsolicitudAdopcionDto: CreateSolicitudAdopcionDto
    ) {
      const result = await this.userService.soliciutdAdopcion(createsolicitudAdopcionDto);

      return {
        status: HttpStatus.OK,
        accept: result
      };


    }

    @Post('creaUbicacion')
    async creaUbicacion(
      @Body() creaUbicacionDto: CreateUbicacionDto
    ) {
      const result = await this.userService.creaUbicacion(creaUbicacionDto);

        return {
          status: HttpStatus.OK,
          accept: result
        };
    }


    @Get(':term/verUsersUbicacion')
    verUserUbicacion(
    @Param('term') term: string) {
      return this.userService.findOndeUserUbicacion(term);
    }


  
    @Post('likeMascota')
    async likeMascota(
      @Body() createLikeDto: CreateLikeDto
    ) {
      const result = await this.userService.likeMascota(createLikeDto);

        return {
          status: HttpStatus.OK,
          accept: result
        };
    }

    @Get('mascotaFAV/:id')
    async contarMascotaFavorita(@Param('id') idMascota: string): Promise<number> {
      return this.userService.contarMascotaFavorita(Number(idMascota));
    }

    @Get('x/c')
    async mascotaMasLikeada(): Promise<any> {
      const masLikeada = await this.userService.mascotaMasLikeada();
      return { masLikeada };
    }

}