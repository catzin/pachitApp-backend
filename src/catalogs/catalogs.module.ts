import { Module } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { CatalogsController } from './catalogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { civilState } from './entities/civil-state.entity';
import { Sex } from './entities/sex.entity';
import { SexService } from './services/sex/sex.service';
import { UserTypeService } from './services/user-type/user-type.service';
import { UserType } from './entities/user-type.entity';
import { OcupationService } from './services/ocupation/ocupation.service';
import { Ocupation } from './entities/ocupation.entity';
import { ResidenceService } from './services/residence/residence.service';
import { Residence } from './entities/resident-type.entity';
import { RelationshipService } from './services/relationship/relationship.service';
import { RelationShip } from './entities/relationShip.entity';
import { CivilStateService } from './services/civil-state/civil-state.service';
import { DocumentTypeService } from './services/document/document.service';
import { DocumentType } from './entities/document-entity';
import { PetAgeService } from './services/pet-age/pet-age.service';
import { PetAge } from './entities';

@Module({
  controllers: [CatalogsController],
  providers: [CatalogsService, SexService, UserTypeService, OcupationService, ResidenceService, RelationshipService, CivilStateService, DocumentTypeService, PetAgeService],
  imports: [
    TypeOrmModule.forFeature([civilState, Sex, UserType, Ocupation, Residence, RelationShip, DocumentType, PetAge])
  ]
})
export class CatalogsModule { }
