//import { civilState } from "src/catalogs/entities";
import { Organizacion } from "src/organizacion/entitites/organizacion.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
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


    @Column({ type: 'text', length: 255, unique: true })
    correo: string;

    @Column('text',{
        select:false
    })
    contrasena: string; 

    @Column()
    fotoPerfil: string; 

    @Column({unique:true})
    linkFacebook: string; 

    @Column({unique:true})
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

    @Column('bool',{
        default:true
    })
    isactive: boolean;

    // @ManyToOne(() => civilState)
    // @JoinColumn({ name: 'estadoCivil_idEstadoCivil' })
    // estadoCivil: civilState;



    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.correo = this.correo.toLocaleLowerCase().trim();
        
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
        
    }

    // @OneToMany(() => Usuario, (usuario) => usuario.organizacion)
    // usuarios: Usuario[];


}