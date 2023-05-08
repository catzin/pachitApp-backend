import { IsDateString, IsNumber, IsString} from 'class-validator';

export class CreateLikeDto{


    @IsNumber()
    mascota : number;

    @IsString()
    usuario: string;
  

}