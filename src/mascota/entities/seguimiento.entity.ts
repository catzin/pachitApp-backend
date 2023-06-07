import { IsBoolean, IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { civilState } from '../../catalogs/entities/civil-state.entity';
import { Organizacion } from "src/organizacion/entitites/organizacion.entity";
import { Adopcion } from "src/mascota/entities/adopcion.entity";

@Entity("seguimiento")
export class Seguimiento{
    @PrimaryGeneratedColumn('uuid') 
    idPeticion:string;

    
    @Column({ type: "date" })
    fechaNotificacion: Date;


    @ManyToOne(type => Adopcion, adopcion => adopcion.seguimiento)
    @JoinColumn({ name: 'id' })
    adopcion: Adopcion;

    @Column({ default: false })
    status: boolean;
}