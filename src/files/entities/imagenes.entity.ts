import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('imagenes')
export class Imagenes {
  @PrimaryGeneratedColumn('uuid')
  idimagenes: string;

  @Column({ length: 45 })
  nombre: string;

  @Column({ length: 80 })
  path: string;

  @Column()
  fechaSubida: Date;
}