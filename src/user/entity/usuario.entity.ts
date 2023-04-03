import { IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { civilState } from '../../catalogs/entities/civil-state.entity';
import { Organizacion } from "src/organizacion/entitites/organizacion.entity";
import { Peticion } from './peticion.entity';
import { Caracteristica } from "src/mascota/entities/caracteristica.entity";
import { TipoDocumento } from "src/files/entities/tipo-documento.entity";
import { Imagenes } from "src/files/entities/imagenes.entity";

@Entity("usuario")
export class Usuario{
    
    @PrimaryGeneratedColumn('uuid') 
    idusuario:string;

    @Column()
    nombre: string;

    @Column()
    apellidoPaterno: string;

    @Column()
    apellidoMaterno: string;

    @Column()
    fechaNacimiento: Date;

    @Column()
    fechaRegistro: Date;


    @Column()
    correo: string;

    @Column('text',{
        select:false
    })
    contrasena: string; 

    @Column()
    fotoPerfil: string; 

    @Column()
    linkFacebook: string; 

    @Column()
    linkInstagram: string; 

    @Column()
    estadoCivil_idEstadoCivil: number;

    @Column()
    sexo_idSexo: number; 

    @Column()
    ocupacion_idOcupacion: number; 

    @Column()
    tipoUsuario_idTipoUsuario: number; 
    
    @Column()
    Tipodomicilio_idTipoDomicilio: number; 

    @Column()
    isactive: boolean;

    //Relaciones uno a uno
    @OneToOne(type => Organizacion, organizacion => organizacion.usuario)
    organizacion: Organizacion;

    //Relaciones uno a uno
    @OneToOne(type => Peticion, peticion => peticion.usuario)
    peticion: Peticion;


    @ManyToMany(() => TipoDocumento)
    @JoinTable({
      name:'documentacion'
    })
    documentacion: TipoDocumento[];
  
    
    @ManyToMany(() => Imagenes)
    @JoinTable({
      name:'documentacion'
    })
    documentacion1: Imagenes[];
  



}