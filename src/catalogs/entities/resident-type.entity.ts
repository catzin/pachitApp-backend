import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'Tipodomicilio'
})
export class Residence{

    @PrimaryGeneratedColumn()
    idTipoDomicilio : number;

    @Column({ length: 40 })
    domicilio : string;


}