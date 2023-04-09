import { IsBoolean, IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { civilState } from '../../catalogs/entities/civil-state.entity';
import { Organizacion } from "src/organizacion/entitites/organizacion.entity";
import { Usuario } from "./usuario.entity";

@Entity("peticion")
export class Peticion{
    @PrimaryGeneratedColumn('uuid') 
    idPeticion:string;

    @Column()
    motivo: string;

    @Column({ default: false })
    @IsBoolean()
    estatus: boolean;


    @OneToOne(type => Usuario, usuario => usuario.peticion)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

}