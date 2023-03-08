import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from '../../user/entity/usuario.entity';

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

    // @OneToMany(() => Usuario, (usuario) => usuario.estadoCivil)
    // usuarios?: Usuario[];

}