import { IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organizacion } from "src/organizacion/entitites/organizacion.entity";
import { Peticion } from './peticion.entity';
import { SolicitudAdopcion } from "src/mascota/entities/solicitud-adopcion.entity";
import { Ubicacion } from "./ubicacion.entity";
import { HorarioContacto } from "./horario-contacto.entity";
import { MascotaFavorita } from "src/mascota/entities/mascota-favorita.entity";
import { Ocupation, Residence, Sex, UserType, civilState } from "src/catalogs/entities";
import { Referencia } from "./referencia.entity";
import { Firma } from "./firma.entity";
import { Domicilio } from "./domicilio.entity";
import { Documento } from "./documento.entity";

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

    @Column()
    contrasena: string; 

    @Column()
    fotoPerfil: string; 

    @Column()
    linkFacebook: string; 

    @Column()
    linkInstagram: string; 

    @Column()
    telefono : string

    @ManyToOne(() => civilState)
    @JoinColumn({name : 'estadoCivil_idEstadoCivil'})
    estadoCivil_idEstadoCivil: number;


    @ManyToOne(() => Sex)
    @JoinColumn({name : 'sexo_idSexo'})
    sexo_idSexo: number; 

    @ManyToOne(() => Ocupation)
    @JoinColumn({name : 'ocupacion_idOcupacion'})
    ocupacion_idOcupacion: number; 

    @ManyToOne(() => UserType)
    @JoinColumn({name : 'tipoUsuario_idTipoUsuario'})
    tipoUsuario_idTipoUsuario: number; 
    
    @ManyToOne(() => Residence)
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


    @OneToMany(() => SolicitudAdopcion, 
    solicitudAdopcion => solicitudAdopcion.usuario)
    solicitudAdopcion: SolicitudAdopcion[];

    @OneToMany(() => MascotaFavorita, 
    mascotaFavorita => mascotaFavorita.usuario)
    mascotaFavorita: MascotaFavorita[];

    @Column({
      default:'user'
    })
    roles:string;


    @OneToMany(() => Referencia, contacto => contacto.usuario)
    contactosReferencia: Referencia[];

    @OneToMany(() => Firma, firma => firma.usuario)
    firmas: Firma[];

    @OneToMany(() => Domicilio, domicilio => domicilio.usuario)
    domicilio: Domicilio[];

    @OneToMany(() => Documento, documento => documento.usuario)
    documentacion: Domicilio[];



}