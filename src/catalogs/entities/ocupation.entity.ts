import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'ocupacion'
})
export class Ocupation {

    @PrimaryGeneratedColumn()
    idOcupacion : number;

    @Column('text',{
        unique : true
    })
    ocupacion : string;

}
