import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ocupation } from '../../entities/ocupation.entity';


@Injectable()
export class OcupationService {

    constructor(
        @InjectRepository(Ocupation)
        private readonly ocupationRepository: Repository<Ocupation>
    ) { }

    async findAll() {
        try {

            const response = await this.ocupationRepository.find();

            return response.length > 0 ? response : [];

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error');
        }
    }
}
