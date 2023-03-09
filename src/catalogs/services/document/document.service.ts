import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentType } from 'src/catalogs/entities/document-entity';
import { Repository } from 'typeorm';


@Injectable()
export class DocumentTypeService {

    constructor(
        @InjectRepository(DocumentType)
        private readonly documentRespository : Repository<DocumentType>
    ){}

    async findAll(){
        try {

            const response = await this.documentRespository.find();

            return response.length > 0 ? response : [];
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error');
        }
    }
}
