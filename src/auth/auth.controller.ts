import { Body, Controller, Post, UseGuards, Request, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';



@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: any) {
   // console.log(user);
    return this.authService.login(user);
  }

  @Get()
  getWelcomeMessage(): string {
    return '¡Bienvenido al controlador de autenticación!';
  }

  // @Post('register')
  // create(@Body() createUserDto: CreateUserDto){
  //   return this.authService.create(createUserDto);
  // }

}