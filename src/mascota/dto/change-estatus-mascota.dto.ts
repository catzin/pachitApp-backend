import {  IsBoolean, IsDateString, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';

export class ChangeEstatusMascotaDto{

    @IsBoolean()
    estatus : boolean;

    @IsNumber()
    mascotaId: number;

    @IsUUID()
    organizacionId:string;

}