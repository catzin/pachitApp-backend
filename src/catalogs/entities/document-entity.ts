
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipoDocumento')
export class DocumentType{

    @PrimaryGeneratedColumn()
    idTipoDocumento : number;

    @Column({ length: 90 })
    documento : string;


}