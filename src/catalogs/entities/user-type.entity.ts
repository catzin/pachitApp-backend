import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'tipoUsuario'
})
export class UserType{

    @PrimaryGeneratedColumn()
    idTipoUsuario : number;

    @Column({ length: 40 })
    usuario : string;

}