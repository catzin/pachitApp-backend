import { IsBoolean, IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { civilState } from '../../catalogs/entities/civil-state.entity';
import { Organizacion } from "src/organizacion/entitites/organizacion.entity";
import { Usuario } from "./usuario.entity";

@Entity("ubicacion")
export class Ubicacion{
    @PrimaryGeneratedColumn('uuid')
    idUbicacion

    @Column()
    street: string;
  
    @Column({ length: 45 })
    ISOCountryCode: string;
  
    @Column({ length: 45 })
    PostalCode: string;
  
    @Column({ length: 45 })
    administrativeArea: string;

    @Column({ length: 45 })
    subadministrativeArea: string;

    @Column({ length: 45 })
    locality: string;

    @Column({ length: 45 })
    sublocality: string;
    
    @Column({ length: 45 })
    thoroughfare: string;
  
    @Column({ length: 45 })
    Subthoroughfare: string;

    @Column()
    lat: string;
    @Column()
    lon: string;


    @OneToOne(type => Usuario, usuario => usuario.ubicacion)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

}