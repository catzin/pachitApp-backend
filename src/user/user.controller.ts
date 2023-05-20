import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { CreatePeticionDto } from './dto/create-peticion.dto';
import { CreateSolicitudAdopcionDto } from './dto/create-solicitud.dto';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { CreateLikeDto } from './dto/create-like.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


  @Controller('user')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Get('test')
    // @SetMetadata('roles',[1,2])
    // @UseGuards(AuthGuard(), UserRoleGuard)
    async findAll(@Query() paginationDto:PaginationDto) {
      return await this.userService.findAll(paginationDto);
    }

    @Post('find')
    async findOne(@Body('idUsuario') term: string) {

      try{
        const result = await this.userService.findOne(term);
        return result;

      }catch(error){
        if (error instanceof HttpException) {
          throw new HttpException(error.message, error.getStatus());
        }
        throw new HttpException('Error interno del servidor', 500);

      }
      
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


    @Post('tipoUsuario')
    
    async findUserType(
      @Body('idusuario') idusuario : string
    ){
      const result = await this.userService.getUserType(idusuario);
      if(result){
        return {
          status : HttpStatus.OK,
          result
        }
      }
      else{
        return {
          status : HttpStatus.NOT_FOUND
        }
      }
    }

  
    //Crea organizacion
    // Funcion para desarrolladores: Crea una organizacion al usuario correspondietne
    @Post('creaOrganizacion')
    @UseInterceptors(FilesInterceptor('files'))
    async createOrganizacion(
      
      @UploadedFiles() fotos: Express.Multer.File[],
      @Body() createOrganizacionDto: CreateOrganizacionDto,
    
    ){
      const result = await this.userService.createOrganizacion(createOrganizacionDto, fotos);
      return result;
    
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
        result
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

      if(result){
        return {
          status : HttpStatus.OK,
          ubicacion : result
        }
      }

        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          ubicacion : {}
        };
    }


    @Post('verUsersUbicacion')
    verUserUbicacion(
    @Body('idUsuario') term: string) {
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

    @UseInterceptors(FileInterceptor('file'))
   
  
    @Post('profileimage')
    async uploadProfilePicture(
      @UploadedFile() file : Express.Multer.File,
      @Body('idUsuario') id : string,
      @Request() req

    ){
      try{
        const result = await this.userService.updateProfilePicture(file , id);
        return result;
      }catch(e){
        console.log(e);
      }
    }

    @Post('getImageProfile')
    async getProfileImage(
      @Body('idUsuario') id : string 
    ){

      try{

        const result = await this.userService.getProfileImage(id);
        return result;

      }catch(e){
        console.log(e);
      }


    }



}