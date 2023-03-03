import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from '../../entities/user-type.entity';

@Injectable()
export class UserTypeService {

    constructor(
        @InjectRepository(UserType)
        private readonly userTypeRepository : Repository<UserType>
    ){}

    async findAll(){
        try {

            const response = await this.userTypeRepository.find();

            return response.length > 0 ? response : [];
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error');
        }
    }
}
