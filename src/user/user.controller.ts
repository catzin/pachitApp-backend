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

    @Delete()
    deleteUserEdoCivil1() {
      return this.userService. deleteUsuariosWithSexoUno();
    } 

   
  
    @Patch(':idusuario')
    update(
    @Param('idusuario') idusuario: string,
    @Body() updateUserDto:UpdateUserDto){
      return this.userService.update(idusuario,updateUserDto);
    }
  
    //Crea organizacion
    // Funcion para desarrolladores: Crea una organizacion al usuario correspondietne
    @Post(':idusuario/organizacion')
    async createOrganizacion(
    @Param('idusuario') idusuario:string,
    @Body() createOrganizacionDto: CreateOrganizacionDto
    ){
      const result= await this.userService.createOrganizacion(idusuario,createOrganizacionDto);
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

    @Post(':idusuario/peticion')
    async createPeticion(
      @Param('idusuario') idusuario: string,
      @Body() createPeticionDto: CreatePeticionDto,
    ) {
      const result = await this.userService.upgradeOrganizacion(idusuario, createPeticionDto);
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
        message: 'Peticion created successfully',
      };
 
  }
}