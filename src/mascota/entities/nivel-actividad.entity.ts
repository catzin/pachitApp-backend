import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Mascota } from './mascota.entity';

@Entity('nivelactividad')
export class NivelActividad{
  @PrimaryGeneratedColumn()
  idnivelActividad: number;

  @Column({ length: 45 })
  nombre: string;

  @OneToMany(
    () => Mascota,
    (mascota) => mascota.nivelActividad_idnivelActividad
    )
   mascotas: Mascota[]  
}