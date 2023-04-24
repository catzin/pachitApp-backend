import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organizacion } from './organizacion.entity';

@Entity('recordatorio')
export class Recordatorio {
  @PrimaryGeneratedColumn()
  idrecordatorio: number;

  @Column({ length: 45 })
  titulo: string;

  @Column({ length: 200 })
  descripcion: string;

  @Column()
  fechaCreacion: Date;


  @ManyToOne(() => Organizacion)
  @JoinColumn({ name: 'id_organizacion' })
  organizacion: Organizacion;


}