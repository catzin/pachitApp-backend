import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MascotaImagen } from './mascota-imagen.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';

@Entity("mascota")
export class Mascota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  nombre: string;

  @Column({ length: 200 })
  descripcion: string;

  @Column()
  edad: number;

  @Column({ length: 45 })
  nivelActividad: string;

  @Column()
  estatus: number;

  @Column({ length: 45 })
  sexo: string;

  @OneToMany(
    () => MascotaImagen,
    (mascotaImagen) => mascotaImagen.mascota,
    {cascade:true, eager:true}

  )
  images?: MascotaImagen[]


  @ManyToOne(() => Organizacion)
  @JoinColumn({ name: 'id_organizacion' })
  organizacion: Organizacion;
  

}