import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'tipoUsuario'
})
export class UserType{

    @PrimaryGeneratedColumn()
    idTipoUsuario : number;

    @Column('text',{
        unique : true
    })
    usuario : string;

}