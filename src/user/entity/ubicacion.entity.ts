import { IsBoolean, IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { civilState } from '../../catalogs/entities/civil-state.entity';
import { Organizacion } from "src/organizacion/entitites/organizacion.entity";
import { Usuario } from "./usuario.entity";

@Entity("ubicacion")
export class Ubicacion{
    @PrimaryGeneratedColumn('uuid')
    idUbicacion: string;
  
    @Column({ length: 45 })
    codigoPostal: string;
  
    @Column({ length: 45 })
    asentamiento: string;
  
    @Column({ length: 45 })
    tipoAsentamiento: string;
  
    @Column({ length: 45 })
    municipio: string;
  
    @Column({ length: 45 })
    estado: string;
  
    @Column({ length: 45 })
    ciudad: string;
  
    @Column({ length: 45 })
    colonia: string;
  
    @Column({ length: 45 })
    calle: string;
  
    @Column()
    numExterior: number;
  
    @Column({ length: 45 })
    numInt: string;
  
    @Column({ length: 45 })
    latitud: string;
  
    @Column({ length: 45 })
    longitud: string;
  
    @Column({ length: 45 })
    label: string;
  

    @OneToOne(type => Usuario, usuario => usuario.ubicacion)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

}