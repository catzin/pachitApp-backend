import { IsString, IsDate, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePeticionDto{

  
    @IsString()
    motivo: string;
  

}