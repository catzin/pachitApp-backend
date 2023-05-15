import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sexo')
export class Sex{

    @PrimaryGeneratedColumn()
    idSexo : number;

    @Column({ length: 30 })
    sexo : string;


}