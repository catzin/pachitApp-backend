import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Mascota } from './mascota.entity';

@Entity('tipomascota')
export class TipoMascota{
  @PrimaryGeneratedColumn()
  idtipoMascota: number;

  @Column({ length: 45 })
  mascota: string;

  @OneToMany(
    () => Mascota,
    (mascota) => mascota.tipoMascota_idtipoMascota
    )
   mascotas: Mascota[]  
}