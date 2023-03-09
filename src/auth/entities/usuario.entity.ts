import { civilState } from "src/catalogs/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('text',
    {unique:true}
    )
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

    @ManyToOne(() => civilState)
    @JoinColumn({ name: 'estadoCivil_idEstadoCivil' })
    estadoCivil: civilState;

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