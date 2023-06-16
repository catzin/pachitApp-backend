import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContratoDto {
  @IsNotEmpty()
  @IsString()
  organizationName: string;

  @IsNotEmpty()
  @IsString()
  adopterName: string;

  @IsString()
  additionalClause: string;

}