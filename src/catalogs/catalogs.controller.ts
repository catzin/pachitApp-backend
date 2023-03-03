import { Controller, Get, Param } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';

@Controller('catalogs')
export class CatalogsController {
  constructor(
    private readonly catalogsService: CatalogsService,
   
    ) {}

  @Get(':type')
  findOne(@Param('type') type: string) {
    return this.catalogsService.findOne(type);
  }

}
