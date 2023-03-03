import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'estadoCivil'
})
export class civilState{

    @PrimaryGeneratedColumn()
    idEstadoCivil : number;

    @Column('text',{
        unique : true
    })
    estadoCivil : string;

}