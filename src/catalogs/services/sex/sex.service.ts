import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sex } from '../../entities/sex.entity';

@Injectable()
export class SexService {

    constructor(
        @InjectRepository(Sex)
        private readonly sexRepository : Repository<Sex>
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
