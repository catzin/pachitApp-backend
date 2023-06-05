import { Body, Controller, Post, UseGuards, Request, HttpException, HttpStatus, Get, SetMetadata, Res, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { Usuario } from 'src/user/entity/usuario.entity';
import { RawHeaders, GetUser } from './decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';




@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    ){}

  
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto){
    try{

      const result = await this.authService.create(createUserDto);
      return result;

    }catch(e){
     
      throw new HttpException(e.message, e.status);

    }
    
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
  @SetMetadata('roles','organizacion')
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
  @GetUser() user:Usuario,
  ){
    return {
      ok:true,
    };
  }

  @Get('private3')
  @SetMetadata('roles','user')
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute3(
  @GetUser() user:Usuario,
  ){
    return {
      ok:true
    };
  }


  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googlelogin(){}

  // @Get('test123')
  // @UseGuards(AuthGuard('jwt'))
  // async test123(@Res() res){
  //   res.json('success');

  // }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(
  @Req() req, @Res() res)
  //,@Body() createUserGoogleDto: CreateUserGoogleDto)
  {
    //Verifica que el correo que eligio para ingresar no exista en la BD
    const correoExistente = await this.userService.verificarCorreo(req.user.email);
  
    

    //Si no existe crea un usuario con el DTO
    if (!correoExistente) {
      const createUserGoogle = await this.authService.createCuentaGoogle(
        req.user.email,
        req.user.firstName,
        req.user.lastName,
        req.user.picture     
      );
    }

    //const jwt = await this.authService.loginGoogle(req.user);
    
    // res.set('authorization', jwt.access_token);

    // res.json(req.user);

    res.redirect('https://accounts.google.com');
    
  }







}