import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { MascotaImagen } from './mascota-imagen.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Caracteristica } from './caracteristica.entity';
import { Imagenes } from 'src/files/entities/imagenes.entity';
import { TipoMascota } from './tipo-mascota.entity';
import { TipoRaza } from './tipo-raza.entity';
import { NivelActividad } from './nivel-actividad.entity';


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

  @ManyToMany(() => Caracteristica)
  @JoinTable({
    name:'caracteristicas'
  })
  caracteristicas: Caracteristica[];

  @ManyToOne(() => TipoMascota, (tipoMascota) => tipoMascota.mascotas)
  @JoinColumn({ name: 'idtipoMascota' })
  tipoMascota_idtipoMascota: TipoMascota;

  @ManyToOne(() => TipoRaza, (tipoRaza) => tipoRaza.mascotas)
  @JoinColumn({ name: 'idtipoRaza' })
  tipoRaza_idtipoRaza: TipoRaza;

  @ManyToOne(() => NivelActividad, (nivelActividad) => nivelActividad.mascotas)
  @JoinColumn({ name: 'idnivelActividad' })
  nivelActividad_idnivelActividad: NivelActividad;


  @ManyToMany(() => Imagenes)
  @JoinTable({
    name:'mascotaImg'
  })
  mascotaImg: Imagenes[];




}