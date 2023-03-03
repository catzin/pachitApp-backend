import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Residence } from 'src/catalogs/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ResidenceService {
    constructor(
        @InjectRepository(Residence)
        private readonly residenceRepository : Repository<Residence>
    ){}

    async findAll(){
        try {

            const response = await this.residenceRepository.find();

            return response.length > 0 ? response : [];
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error');
        }
    }
}




