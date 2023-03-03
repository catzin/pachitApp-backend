import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { civilState } from 'src/catalogs/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CivilStateService {
    constructor(
        @InjectRepository(civilState)
        private readonly sexRepository : Repository<civilState>
    ){}

    async findAll(){
        try {

            const response = await this.sexRepository.find();

            return response.length > 0 ? response : [];
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error');
        }
    }
}
