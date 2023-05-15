import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'petEdad'
})
export class PetAge {

    @PrimaryGeneratedColumn()
    idEdad : number;

    @Column({ length: 80 })
    descripcion : string;

}
