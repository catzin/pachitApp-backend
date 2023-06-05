import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { RelationShip } from "src/catalogs/entities/relationShip.entity";

@Entity("referencia")
export class Referencia{
    
    @PrimaryGeneratedColumn('uuid') 
    idReferencia : string;
    @Column()
    nombre : string;
    @Column()
    apellidoPaterno : string;
    @Column()
    apellidoMaterno : string;
    @Column()
    telefono : string;
   
    @Column()
    active : number;

    @ManyToOne(() => RelationShip)
    @JoinColumn({name : 'parentesco_idParentesco'})
    parentesco_idParentesco: RelationShip; 

    @ManyToOne(() => Usuario)
    @JoinColumn({name : 'idusuario'})
    usuario: Usuario;


    
    

}