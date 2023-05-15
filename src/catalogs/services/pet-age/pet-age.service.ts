import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetAge } from 'src/catalogs/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PetAgeService {
    constructor(
        @InjectRepository(PetAge)
        private readonly petAgeRepository : Repository<PetAge>
    ){}

    async findAll(){
        try {

            const response = await this.petAgeRepository.find();

            return response.length > 0 ? response : [];
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error');
        }
    }
}
