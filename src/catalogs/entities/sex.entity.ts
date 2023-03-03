import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sexo')
export class Sex{

    @PrimaryGeneratedColumn()
    idSexo : number;

    @Column('text',{
        unique : true
    })
    sexo : string;


}