import {
    Body,
    Controller,
    Delete,
    Get,
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
    @Post(':idusuario/organizacion')
    createOrganizacion(
    @Param('idusuario') idusuario:string,
    @Body() createOrganizacionDto: CreateOrganizacionDto
    ){
      this.userService.createOrganizacion(idusuario,createOrganizacionDto);
    }
  
 
  }
  