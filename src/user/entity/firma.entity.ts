import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity('firma')
export class Firma{
    
    @PrimaryGeneratedColumn('uuid')
    idFirma : string;

    @Column()
    path : string; 

    @ManyToOne(() => Usuario, usuario => usuario.domicilio)
    usuario: Usuario;
    
}