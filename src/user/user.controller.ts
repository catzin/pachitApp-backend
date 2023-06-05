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
  SetMetadata,
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
  UseGuards,
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
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { createReferenciaDto } from './dto/create-referencia.dto';
import { patchUserDto } from './dto/patch-user.dto';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';


  @Controller('user')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Get('test')
    //@SetMetadata('roles',['user'])
    //@UseGuards(AuthGuard(), UserRoleGuard)
    async findAll(@Query() paginationDto:PaginationDto) {
      return await this.userService.findAll(paginationDto);
    }

    @Post('find')
    @SetMetadata('roles',['organizacion','user'])
    @UseGuards(AuthGuard(), UserRoleGuard)
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

    @Post('perfil-adopcion')
    @SetMetadata('roles',['user','organizacion'])
    @UseGuards(AuthGuard(), UserRoleGuard)
    async adoptProfile(
      @Body('idUsuario') idUsuario : string
    ){

      try{
        const result = await this.userService.findAdoptProfile(idUsuario);
        return result;

      }catch(error){
        console.log(error);
        if (error instanceof HttpException) {
          throw new HttpException(error.message, error.getStatus());
        }
        throw new HttpException('Error interno del servidor', 500);

      }

    }


    @Post('crearReferencia')
    async createReference(
      @Body() referencia : createReferenciaDto
    ){
      try{
        const response = await this.userService.createReference(referencia);
        return {
          statusCode : HttpStatus.OK,
          message: 'Referencia creada correctamente',
          user: response,
        };

      }catch(e){
        throw new HttpException(e.message, e.status);

      }
    }

    @Post('eliminarReferencia')
    async deleteReference(
      @Body('idReferencia') idReferencia : string
    ){

      try {

        const result = await this.userService.deleteReference(idReferencia);
        return result;
        
      } catch (e) {
        throw new HttpException(e.message, e.status);
      }

    }

    @Post('buscarReferencias')
    async searchReferences(
      @Body('idUsuario') idUsuario: string
    ){

      try {

        const response = await this.userService.searchReferences(idUsuario);
        return response;
        
      } catch (e) {
        throw new HttpException(e.message, e.status);
      }

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
    @SetMetadata('roles',['user'])
    @UseGuards(AuthGuard(), UserRoleGuard)
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
    @SetMetadata('roles',['user'])
    @UseGuards(AuthGuard(), UserRoleGuard)
    async solicitudAdopcion(
      @Body() createsolicitudAdopcionDto: CreateSolicitudAdopcionDto
    ) {
      const result = await this.userService.soliciutdAdopcion(createsolicitudAdopcionDto);

      return {
        status: HttpStatus.OK,
        message: '¡Solicitud enviada!',
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



    @Post('dislikeMascota')
    async deleteFromFavorites(
      @Body() dislikeDto : CreateLikeDto
    ){
      try{

       const result = await this.userService.dislikePet(dislikeDto);
       return {
        status : HttpStatus.OK,
        result : result
       }
        
      }catch(e){
        throw new HttpException(e.message, e.status);
      }
    }


  
    @Post('likeMascota')
    async likeMascota(
      @Body() createLikeDto: CreateLikeDto
    ) {

      try{
        
        const result = await this.userService.likeMascota(createLikeDto);
 

        return {
          status: HttpStatus.OK,
          accept: result
        };

      }catch(e){
        throw new HttpException(e.message, e.status);
      }
     
    }

    @Post('mascotaLikes')
    async countLikes(
      @Body('idmascota') idMascota : number
    ){

      try{

        const likes = await this.userService.countLikesByPet(idMascota);
        return {
          status: HttpStatus.OK,
          likes : likes
        }

      }catch(e){

      }

    }



    @UseInterceptors(FileInterceptor('file'))
    @Post('profileimage')
    @SetMetadata('roles',['user'])
    @UseGuards(AuthGuard(), UserRoleGuard)
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

    @Get('masLikeada')
    async findMostLiked(){
      try{

        const result = await this.userService.findMostLiked();
        console.log(result);

      }catch(e){
        throw new HttpException(e.message, e.status);
  
      }
    }

    //Cambia estatus de solicitudes para adoptar
    @Patch('tiempoSeguimiento')
    @SetMetadata('roles','user')
    @UseGuards(AuthGuard(), UserRoleGuard)
    async changeSolicitud(@Body() updateSeguimientoDto:UpdateSeguimientoDto) {
      return this.userService.updateAdopcionSeguimiento(updateSeguimientoDto);
    }

  
    //Sube la imagen de seguimiento
    @Post('seguimientoImage')
    @SetMetadata('roles','user')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard(), UserRoleGuard)
    async uploadSeguimientoPicture(
      @UploadedFile() file : Express.Multer.File,
      @Body('idUsuario') id : string,
      @Request() req

    ){
      try{
        const result = await this.userService.uploadSeguimientoPicture(file , id);
        return result;
      }catch(e){
        console.log(e);
      }
    }


    @Post('mascotasFavoritas')
    async findFavoritePets(
      @Body('idUsuario') usuario : string
    ){
      try{
        const result = await this.userService.findMascotasFavoritas(usuario);
        return{
          status : HttpStatus.OK,
          pets : result
        }

      }catch(e){

        throw new HttpException(e.message, e.status);

      }
    }

    @Post('shelter-user')
    async verifyShelterUser(
      @Body('idUsuario') idUser : string
    ){

      try {

        const result = await this.userService.verifyShelterUser(idUser);

        return {
          status : HttpStatus.OK,
          message : 'success',
          orgName : result
        }
        
      } catch (e) {

        throw new HttpException(e.message, e.status);
        
      }

    }

    @Patch('updateInfo')
    async patchSimpleUserInfo(
      @Body() data: patchUserDto
    ){
      try{

        await this.userService.updateUserInfo(data);

        return {
          status : HttpStatus.OK,
          message : 'success'
        }


      }catch(e){
        throw new HttpException(e.message, e.status);
      }
    }

    @Post('domicilioEvidencia')
    //@SetMetadata('roles',['organizacion'])
    //@UseGuards(AuthGuard(), UserRoleGuard)
    @UseInterceptors(FilesInterceptor('files')) 
    async residenceEvidence(
      @Body('idusuario') idusuario : string,
      @UploadedFiles() fotos : Express.Multer.File[],
    ){

      try{

        const result = await this.userService.uploadResidenceEvidence(idusuario,fotos);

        return {
          success : HttpStatus.OK,
          result
        }

      }catch(e){
        throw new HttpException(e.message, e.status); 
      }

    }


    @Post('verificaEvidencia')
    async verifyResidenceEvidence(
      @Body('idusuario') idusuario : string
    ){

      try{

        const result = await this.userService.verifyResidenceEvidence(idusuario);
        return {
          status : HttpStatus.OK,
          result
        }

      }catch(e){
        throw new HttpException(e.message, e.status); 
      }

    }


    @Post('documentoEvidencia')
    @UseInterceptors(FilesInterceptor('files')) 
    async documentEvidence(
      @Body('idusuario') idusuario : string,
      @UploadedFiles() fotos : Express.Multer.File[],
    ){

      try{

        const result = await this.userService.uploadResidenceEvidence(idusuario,fotos);

        return {
          success : HttpStatus.OK,
          message : '¡Envidencia registrada!',
          result
        }

      }catch(e){
        throw new HttpException(e.message, e.status); 
      }

    }

    @Post('registraHorario')
    async registerContactHour(
      @Body() data: CreateHorarioDto
    ) {
      try {
        const dta = await this.userService.createContactHour(data);
        return {
          status: HttpStatus.OK,
          response: dta
        }

      } catch (e) {
        throw new HttpException(e.message, e.status);
      }

    }

    @Post('horarioContacto')
    async findContactHourInfo(
      @Body('idusuario') idusuario : string
    ){

      try{
        const response = await this.userService.findContactHourInfo(idusuario);
        return {
          status : HttpStatus.OK,
          response
        }

      }catch(e){
        throw new HttpException(e.message, e.status);

      }

    }

    @Patch('updateHorario')
    async updateContactHour(
      @Body() data : CreateHorarioDto
    ){
      try{

        const result = await this.userService.updateContactHour(data);
        return{
          status : HttpStatus.OK,
          result
        }

      }catch(e){
        throw new HttpException(e.message, e.status);
      }
    }



    
  
}