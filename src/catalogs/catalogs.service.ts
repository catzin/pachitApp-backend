import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { catalogType } from 'src/shared/enums/index';
import { SexService } from './services/sex/sex.service';
import { UserTypeService } from './services/user-type/user-type.service';
import { OcupationService } from './services/ocupation/ocupation.service';
import { ResidenceService } from './services/residence/residence.service';
import { RelationshipService} from './services/relationship/relationship.service';
import { CivilStateService } from './services/civil-state/civil-state.service';
import { DocumentTypeService } from './services/document/document.service';


@Injectable()
export class CatalogsService {


  constructor(
    @Inject(SexService)
    private readonly sexService : SexService,
    @Inject(UserTypeService)
    private readonly userTypeService : UserTypeService,
    @Inject(OcupationService)
    private readonly ocupationService : OcupationService,
    @Inject(ResidenceService)
    private readonly residenceService : ResidenceService,
    @Inject(RelationshipService)
    private readonly relationShipService : RelationshipService,
    @Inject(CivilStateService)
    private readonly civilStateService : CivilStateService,
    @Inject(DocumentTypeService)
    private readonly documentService : DocumentTypeService,

  ){}
  
  async findOne(type: string) {

    try {

      switch (type) {
   
        case catalogType.CIVILSTATE: return this.civilStateService.findAll();
        case catalogType.USERS : return this.userTypeService.findAll();
        case catalogType.SEX : return this.sexService.findAll();
        case catalogType.OCUPATIONS : return this.ocupationService.findAll();
        case catalogType.RESIDENCES : return this.residenceService.findAll();
        case catalogType.RELATIONSHIP : return this.relationShipService.findAll();
        case catalogType.DOCUMENTS : return this.documentService.findAll();
       
      }

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('consulte al admin');
      
    }
  
  }

}
