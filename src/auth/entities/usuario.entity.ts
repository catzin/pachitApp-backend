import { Ocupation, Residence, Sex, UserType, civilState } from "src/catalogs/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn,OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('bool',{
        default:true
    })
    isactive: boolean;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.correo = this.correo.toLocaleLowerCase().trim();  
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
        
    }

}