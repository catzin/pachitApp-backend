import { IsBoolean, IsInt, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { civilState } from '../../catalogs/entities/civil-state.entity';
import { Organizacion } from "src/organizacion/entitites/organizacion.entity";
import { Usuario } from "./usuario.entity";

@Entity("horariocontacto")
export class HorarioContacto{
    
    @PrimaryGeneratedColumn('uuid') 
    idhorarioContacto: number;
  
    @IsString()
    dia: string;
  
    @IsString()
    horaInicio: string;
  
    @IsString()
    horaFin: string;

    @OneToOne(type => Usuario, usuario => usuario.horariocontacto)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    // @Column({ type: 'date' })
    // fechaejemplo: Date;


}