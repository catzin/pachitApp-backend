import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Mascota } from './mascota.entity';

@Entity('tiporaza')
export class TipoRaza{
  @PrimaryGeneratedColumn()
  idtipoRaza: number;

  @Column({ length: 45 })
  mascota: string;

  @OneToMany(
    () => Mascota,
    (mascota) => mascota.tipoRaza_idtipoRaza
    )
   mascotas: Mascota[]  
}