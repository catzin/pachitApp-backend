import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Adopcion } from "src/mascota/entities/adopcion.entity";

@Entity('imagenSeguimiento')
export class ImagenSeguimiento{

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    path : string; 

    @ManyToOne(() =>  Adopcion, adopcion => adopcion.imagenesSeguimiento)
    adopcion: Adopcion;


}