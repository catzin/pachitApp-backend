import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { Usuario } from 'src/user/entity/usuario.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const validRoles: string = this.reflector.get(META_ROLES,context.getHandler());


    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuario;
  
    if(!user)
      throw new BadRequestException('User not found');


      if(validRoles==user.roles){
      return true;
      }else{
        throw new BadRequestException(`This user should be a: ${validRoles}`);
      }
  
  }
}
