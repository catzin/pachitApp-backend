import { Body, Controller, Post, UseGuards, Request, HttpException, HttpStatus, Get, SetMetadata } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { RawHeaders, GetUser } from './decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';




@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  
  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto){
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user:Usuario,
    @GetUser('correo') userEmail: string,
    @RawHeaders()  rawHeaders: string[],
  ){


    return {
      ok:true,
      message:'Hola mundo private',
      user,
      userEmail,
      rawHeaders
    };
  }

  @Get('private2')
  @SetMetadata('roles',[1,2])
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
  @GetUser() user:Usuario,
  ){
    return {
      ok:true,
    };
  }

  @Get('private3')
  @SetMetadata('roles',[1,2])
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute3(
  @GetUser() user:Usuario,
  ){
    return {
      ok:true,
      user
    };
  }







}