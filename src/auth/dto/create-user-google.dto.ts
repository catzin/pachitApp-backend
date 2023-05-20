import { IsBoolean, IsDateString, IsEmail, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserGoogleDto {



    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    contrasena?: string;


    @IsString()
    linkFacebook?: string; 

    @IsString()
    linkInstagram?: string; 

    @IsNumber()
    estadoCivil_idEstadoCivil?: number;

    @IsNumber()
    sexo_idSexo?: number; 

    @IsNumber()
    ocupacion_idOcupacion?: number; 

    @IsNumber()
    tipoUsuario_idTipoUsuario?: number; 

    @IsNumber()
    Tipodomicilio_idTipoDomicilio?: number; 

    @IsBoolean()
    isactive?: boolean;


}