import {  IsBoolean, IsDateString, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';

export class ChangeEstatusSolicitudDto{


    @IsNumber()
    idSolicitud: number;


}