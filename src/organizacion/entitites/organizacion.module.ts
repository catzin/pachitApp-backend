import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';


@Module({

    imports: [TypeOrmModule.forFeature([Organizacion])],
    exports: [TypeOrmModule.forFeature([Organizacion])]
  
  })
  export class UserModule {}
  