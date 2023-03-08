import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Usuario } from './user/entity/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { civilState } from './catalogs/entities/civil-state.entity';
import { Sex } from './catalogs/entities/sex.entity';
import { UserType } from './catalogs/entities/user-type.entity';
import { Ocupation } from './catalogs/entities/ocupation.entity';
import { Residence } from './catalogs/entities';
import { RelationShip } from './catalogs/entities/relationShip.entity';
import { DocumentType } from './catalogs/entities/document-entity';
import { CommonModule } from './common/common.module';
import { OrganizacionModule } from './organizacion/organizacion.module';



@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'pachidb.cmikwqtsgxlj.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'pachiDB',
      entities: [Usuario,civilState,Sex,UserType,Ocupation,Residence,RelationShip,DocumentType],
      synchronize: false,
    }),
    AuthModule,
    CatalogsModule,
    CommonModule,
    OrganizacionModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
