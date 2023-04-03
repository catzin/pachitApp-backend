import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { MascotaImagen } from './mascota-imagen.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Caracteristica } from './caracteristica.entity';
import { Imagenes } from 'src/files/entities/imagenes.entity';
import { TipoMascota } from './tipo-mascota.entity';

enum NivelActividad {
  BAJO = 'BAJO',
  MEDIO = 'MEDIO',
  ALTO = 'ALTO',
}


enum TipoRaza {
  RAZA_1 = 'RAZA_1',
  RAZA_2 = 'RAZA_2',
  RAZA_3 = 'RAZA_3',
}

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
  tipoRaza: string;
  
  @Column({
    type: 'enum',
    enum: NivelActividad,
  })
  nivelActividad: NivelActividad;
  

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


  // @ManyToMany(() => Imagenes)
  // @JoinTable({
  //   name:'mascotaImg'
  // })
  // img: Imagenes[];




}