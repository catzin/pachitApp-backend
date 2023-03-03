
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipoDocumento')
export class DocumentType{

    @PrimaryGeneratedColumn()
    idTipoDocumento : number;

    @Column('text',{
        unique : true
    })
    documento : string;


}