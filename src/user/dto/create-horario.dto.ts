import { IsString } from "class-validator";

export class CreateHorarioDto{

    @IsString()
    idUsuario : string;

    @IsString()
    horario : string;


}