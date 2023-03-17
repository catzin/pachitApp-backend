import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MascotaImage } from './mascota-image.entity';
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
    () => MascotaImage,
    (mascotaImage) => mascotaImage.mascota
  )
  images: MascotaImage


  @ManyToOne(() => Organizacion)
  @JoinColumn({ name: 'id_organizacion' })
  organizacion: Organizacion;
  

}