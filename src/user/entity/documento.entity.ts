import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity('documento')
export class Documento{

    @PrimaryGeneratedColumn('uuid')
    idDocumento : string;

    @Column()
    path : string; 

    @ManyToOne(() => Usuario, usuario => usuario.documentacion)
    usuario: Usuario;

}