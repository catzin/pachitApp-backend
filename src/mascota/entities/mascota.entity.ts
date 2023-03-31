import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MascotaImagen } from './mascota-imagen.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';

enum NivelActividad {
  BAJO = 'BAJO',
  MEDIO = 'MEDIO',
  ALTO = 'ALTO',
}

enum TipoMascota {
  PERRO = 'PERRO',
  GATO = 'GATO',
  OTRO = 'OTRO',
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

  @Column({
    type: 'enum',
    enum: TipoRaza,
  })
  tipoRaza: TipoRaza;
  
  @Column({
    type: 'enum',
    enum: NivelActividad,
  })
  nivelActividad: NivelActividad;
  
  @Column({
    type: 'enum',
    enum: TipoMascota,
  })
  tipoMascota: TipoMascota;

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