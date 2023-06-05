import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity('DomicilioEvidencia')
export class Domicilio{

    @PrimaryGeneratedColumn('uuid')
    idDomicilio : string;

    @Column()
    path : string; 

    @ManyToOne(() => Usuario, usuario => usuario.firmas)
    usuario: Usuario;


}