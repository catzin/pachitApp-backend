import { IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { civilState } from '../../catalogs/entities/civil-state.entity';

@Entity()
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

    @ManyToOne(() => civilState)
    @JoinColumn({ name: 'estadoCivil_idEstadoCivil' })
    estadoCivil: civilState;

}