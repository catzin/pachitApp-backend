import { IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { civilState } from '../../catalogs/entities/civil-state.entity';
import { Organizacion } from "src/organizacion/entitites/organizacion.entity";
import { Peticion } from './peticion.entity';
import { Caracteristica } from "src/mascota/entities/caracteristica.entity";
import { TipoDocumento } from "src/files/entities/tipo-documento.entity";
import { Imagenes } from "src/mascota/entities/imagenes.entity";
import { Mascota } from "src/mascota/entities/mascota.entity";
import { SolicitudAdopcion } from "src/mascota/entities/solicitud-adopcion.entity";
import { Ubicacion } from "./ubicacion.entity";
import { HorarioContacto } from "./horario-contacto.entity";
import { Ocupation, Residence, Sex, UserType, civilState } from "src/catalogs/entities";

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

    @OneToOne(() => civilState)
    @JoinColumn({name : 'estadoCivil_idEstadoCivil'})
    estadoCivil_idEstadoCivil: number;

    @OneToOne(() => Sex)
    @JoinColumn({name : 'sexo_idSexo'})
    sexo_idSexo: number; 

    @OneToOne(() => Ocupation)
    @JoinColumn({name : 'ocupacion_idOcupacion'})
    ocupacion_idOcupacion: number; 

    @OneToOne(() => UserType)
    @JoinColumn({name : 'tipoUsuario_idTipoUsuario'})
    tipoUsuario_idTipoUsuario: number; 
    
    @OneToOne(() => Residence)
    @JoinColumn({name : 'Tipodomicilio_idTipoDomicilio'})
    Tipodomicilio_idTipoDomicilio: number; 

    @Column()
    isactive: boolean;

    //Relaciones uno a uno
    @OneToOne(type => Organizacion, organizacion => organizacion.usuario)
    organizacion: Organizacion;

    //Relaciones uno a uno
    @OneToOne(type => Peticion, peticion => peticion.usuario)
    peticion: Peticion;

    
    //Relaciones uno a uno
    @OneToOne(type => Ubicacion, ubicacion => ubicacion.usuario)
    ubicacion: Ubicacion;

    //Relaciones uno a uno
    @OneToOne(type => HorarioContacto, horariocontacto => horariocontacto.usuario)
    horariocontacto: HorarioContacto;


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


    // @ManyToMany(() => Mascota , mascota => mascota.solicitudesAdopcion)
    // @JoinTable({
    //   name:'solicitud_adopcion',
    //   joinColumn:{
    //     name:'usuario_id',
    //     referencedColumnName:'idusuario'
    //   },
    //   inverseJoinColumn:{
    //     name:'mascota_id',
    //     referencedColumnName:'id'
    //   }
    // })
    // mascotas: Mascota[];
  

    @OneToMany(() => SolicitudAdopcion, 
    solicitudAdopcion => solicitudAdopcion.usuario)
    solicitudAdopcion: SolicitudAdopcion[];
   



}