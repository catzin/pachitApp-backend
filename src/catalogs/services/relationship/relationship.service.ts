import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationShip } from 'src/catalogs/entities/relationShip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RelationshipService {
    constructor(
        @InjectRepository(RelationShip)
        private readonly relationShipRepository : Repository<RelationShip>
    ){}

    async findAll(){
        try {

            const response = await this.relationShipRepository.find();

            return response.length > 0 ? response : [];
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error');
        }
    }
}
