import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, Patch, Post, Query, SetMetadata, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrganizacionService } from './organizacion.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { VerMascotasDto } from './dto/ver-mascotas.dto';
import { CreateRecordatorioDto } from './dto/create-recordatorio.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { IncidenciaDto } from './dto/create-incidencia.dto';


@Controller('organizacion')
export class OrganizacionController {

  constructor(private organizacionService: OrganizacionService) { }


  @Post('idOrganizacion')
  async findIdByUser(@Body('userId') userId : string){
    const id =  await this.organizacionService.searchIdOrg(userId); 

    if(id){
      return {
        status : HttpStatus.OK,
        idOrganizacion : id
      }
    }
    else{
      return{
        status : HttpStatus.NOT_FOUND
      }
    }
    
    
  }

  @Get('tipoMascota')
  findPetTypes(){
    return this.organizacionService.findPetTypes();
  }

  @Get('raza')
  findRazaTypes(){
    return this.organizacionService.findRazaType();
  }


  @Get('caracteristicas')
  findAllCaractertisticas(){
    return this.organizacionService.GetCaracts();
  }

  @Get('nivelActividad')
  fiindLevelActivity(){
    return this.organizacionService.findActivityLevels();
  }


  //Obtiene organizaciones con un limit y offset
  @Get('vertodasOrganizaciones')
  findAllOrganizaciones(@Query() paginationDto: PaginationDto) {
    return this.organizacionService.findAllOrganicaciones(paginationDto);
  }


    //Obtiene mascotas con un limit y offset
    @Post('verEstatusMascotas')
    @SetMetadata('roles',['organizacion'])
    @UseGuards(AuthGuard(), UserRoleGuard)
    verEstatusMascotas(
      @Body() verMascotasDto: VerMascotasDto,
    ) {
      return this.organizacionService.verEstatusMascotas(verMascotasDto);
    }

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
  @Get('mascotas-organizacion/:idorganizacion')
  findAllMascotasxOrganizacion(
    @Param('idorganizacion') idorganizacion: string,
    @Query() paginationDto: PaginationDto) {
    return this.organizacionService.findMascotasbyOrganizacion(idorganizacion, paginationDto);
  }

  //Obtiene la mascota por id
  @Post('mascota')
  async findMascotabyId(
    @Body('idmascota') id: number) {
    try{
      const result = await this.organizacionService.findMascotasbyId(id);

      return {
        status : HttpStatus.OK,
        pet : result
      }

    }catch(e){

    }
   
  }

  //Actualiza la mascota por id con o sin imagenes
  @Patch(':id/mascota')
  @SetMetadata('roles',['organizacion'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  updateMascota(
    @Param('id') id: number,
    @Body() updateMascotaDto: UpdateMascotaDto
  ) {
    return this.organizacionService.updateMascota(id, updateMascotaDto);
  }

  //Elimina una mascota por id
  @Delete(':id/mascota/delete')
  @SetMetadata('roles',['organizacion'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  deleteMascota(
    @Param('id') id: number) {
    this.organizacionService.deleteMascota(id);
  }


  
  @Post('creaMascota')
  @SetMetadata('roles',['organizacion'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseInterceptors(FilesInterceptor('files')) 
  async createMascota(
    @Body() createMascotaDto:any,
    @UploadedFiles() fotos : Express.Multer.File[],
  ){

    const newPet: CreateMascotaDto = {
      nombre: createMascotaDto.nombre,
      descripcion: createMascotaDto.descripcion,
      edad: Number(createMascotaDto.edad),
      idtipoMascota: Number(createMascotaDto.idtipoMascota),
      idtipoRaza: Number(createMascotaDto.idtipoRaza),
      idnivelActividad: Number(createMascotaDto.idnivelActividad),
      sexo: createMascotaDto.sexo,
      estatus: Number(createMascotaDto.estatus),
      caracteristicas:  createMascotaDto.caracteristicas,
      idOrganizacion : createMascotaDto.idOrganizacion,
      secureDisable : createMascotaDto.secureDisable

    }

    const result = await this.organizacionService.createMascota(newPet, fotos);
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
      pet : result
    };
  }
  
  //CREA UN RECORDATORIO 
  @Post('creaRecordatorio')
  @SetMetadata('roles',['organizacion'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  async creaRecordatorio(
    @Body() creaRecordatorio: CreateRecordatorioDto
  ) {
    const result = await this.organizacionService.creaRecordatorio(creaRecordatorio);

      return {
        status: HttpStatus.OK,
        accept: result
      };
  }


  @Post('verRecordatorios')
  @SetMetadata('roles',['organizacion'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  async verRecordatorios(
  @Body('idOrg') term: string) {

    try{
      const resposne = await this.organizacionService.finAllRecordatorios(term);
      return resposne;

    }catch(e){
      throw new HttpException(e.message, e.status);
    }
    
  }


  @Post('miOrganizacion')
  async findOrgInfo(
    @Body('idusuario') usuario : string
  ){
    try{
      const result = await this.organizacionService.findMyOrg(usuario);
      return {
        status : HttpStatus.OK,
        message : 'Success',
        org : result
      }
    }catch(e){

       throw new HttpException(e.message, e.status);

    }
  }

  @Post('firmar')
  @UseInterceptors(FileInterceptor('file')) 
  async uploadSignature(
    @Body('idusuario') idusuario : string, 
    @UploadedFile() foto : Express.Multer.File,
  ){
    try{

      const result = await this.organizacionService.uploadSignature(idusuario , foto);
      return {
        status : HttpStatus.OK,
        success : result
      };

    }catch(e){
      console.log(e);
      throw new HttpException(e.message, e.status);
    }
  }


  @Post('verMascotasConSolicitudes')
  async findAllSolicitudes(
    @Body('idusuario') idusuario : string
  ){
    try{

      const result = await this.organizacionService.findAllPetsWithRequest(idusuario);
      return{
        status : HttpStatus.OK,
        message : "success",
        pets : result
      }

    }catch(e){
      throw new HttpException(e.message, e.status);
    }
  }


  @Post('solicitudPorMascota')
  async findRequestByPet(
    @Body('idMascota') idmascota : number
  ){

    try{
      const response =  await this.organizacionService.fidRequestByPet(idmascota);

      return {
        status : HttpStatus.OK,
        request : response
      }

    }catch(e){
      throw new HttpException(e.message, e.status);
    }

  }

  @Post('listarIncidencias')
  async findIncidences(
    @Body('idmascota') idmascota : number
  ){

    try{

      const result = await this.organizacionService.findAllIncidences(idmascota);
      return {
        status : HttpStatus.OK,
        incidencias : result
      }
      
    }catch(e){
      throw new HttpException(e.message, e.status);

    }

  }

  @Post('imagenAleatoriaMascota')
  async getAleatoryImage(
    @Body('idmascota') idmascota : number
  ){
    try{
      const result = await this.organizacionService.findAleatoryImage(idmascota);
      return{
        status : HttpStatus.OK,
        image : result
      }

    }catch(e){
      throw new HttpException(e.message, e.status);

    }

  }

  @Post('crearIncidencia')
  async uploadIncidence(
    @Body() incidencia : IncidenciaDto
  ){
    try{

      const result = await this.organizacionService.uploadIncidence(incidencia);

      return { 
        status : HttpStatus.OK,
        result
      }

    }catch(e){
      throw new HttpException(e.message, e.status);
    }

  }

  @Post('petsByUser')
  async findPetsByUser(
    @Body('idusuario') idusuario : string
  ){

    try{

      const result = await this.organizacionService.petByUser(idusuario);
      return {
        status : HttpStatus.OK,
        pets : result
      }

    }catch(e){
      throw new HttpException(e.message, e.status);
    }
  }








}


