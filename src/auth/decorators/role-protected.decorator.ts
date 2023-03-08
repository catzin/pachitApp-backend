import { SetMetadata } from '@nestjs/common';

export const META_ROLES ='roles';


export const RoleProtected = (...args: number[]) =>{



    return SetMetadata(META_ROLES, args);
}