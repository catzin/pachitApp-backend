import { Mascota } from 'src/mascota/entities/mascota.entity';
import { Ubicacion } from 'src/user/entity/ubicacion.entity';
import { Usuario } from 'src/user/entity/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Recordatorio } from './recordatorio.entity';
import { Adopcion } from 'src/mascota/entities/adopcion.entity';

@Entity({ name: 'organizacion' })
export class Organizacion{
      @PrimaryGeneratedColumn('uuid')
      idorganizacion: string;

      @Column({ type: 'varchar', length: 150 })
      nombre: string;

      @Column({ type: 'varchar', length: 150 })
      descripcion: string;

      @Column()
      fechaCreacion: Date;

      @Column({ type: 'varchar', length: 150, nullable: true })
      linkInstagram: string;

      @Column({ type: 'varchar', length: 150, nullable: true })
      linkFacebook: string;

      @Column({ type: 'varchar', length: 150, nullable: true })
      fotoPerfil: string;

      @Column({ type: 'varchar', length: 150, nullable: true })
      linkWeb: string;

      @Column({ type: 'varchar', length: 150, nullable: true })
      fotoPortada: string;

      @Column({ type: 'integer' })
      estatus: number;

      @Column({ type: 'varchar', length: 45, nullable: true })
      linkDonacion: string;      

      @OneToOne(type => Usuario, usuario => usuario.organizacion)
      @JoinColumn({ name: 'id_usuario' })
      usuario: Usuario;

      
      @OneToMany(
            () => Mascota,
            (mascota) => mascota.organizacion
      )
      mascotas: Mascota[]


      //Relaciones uno a uno
    @OneToMany(
             () => Recordatorio,
            (recordatorio) => recordatorio.organizacion
    )
    recordatorio: Recordatorio[];



    @OneToMany(() => Adopcion, adopcion => adopcion.organizacion)
    adopciones: Adopcion[];


      
}