import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { Usuario } from 'src/user/entity/usuario.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get<string[]>('roles', context.getHandler());
    
    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuario;
    
    if (!user)
      throw new BadRequestException('User not found');

    // Verifica si alguno de los roles del usuario es válido.
    const userRolesArray = user.roles.split(',');
    const userHasValidRole = userRolesArray.some(role => validRoles.includes(role));

    if (userHasValidRole) {
      return true;
    } else {
      throw new ForbiddenException(`This user should have one of the following roles: ${validRoles.join(", ")}`);
    }
  }
}
