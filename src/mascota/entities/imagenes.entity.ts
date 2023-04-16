import { Mascota } from 'src/mascota/entities/mascota.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';

@Entity('imagen')
export class Imagenes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 45 })
  nombre: string;

  @Column({ length: 200 })
  path: string;

  @Column()
  fechaSubida: Date;

  @ManyToMany(() => Mascota , mascota => mascota.mascotaImgs)
  @JoinTable({
    name:'mascota_imagen',
    joinColumn:{
      name:'imagen_id',
      referencedColumnName:'id'
    },
    inverseJoinColumn:{
      name:'mascota_id',
      referencedColumnName:'id'
    }
  })
  mascotas: Mascota[];


} 