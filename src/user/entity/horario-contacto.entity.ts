import { IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity("horarioContacto")
export class HorarioContacto{
    
    @PrimaryGeneratedColumn('uuid') 
    idhorarioContacto: number;
  
    @IsString()
    @Column()
    especificacion: string;

    @OneToOne(type => Usuario, usuario => usuario.horariocontacto)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

}