import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('tipodocumento')
export class TipoDocumento {
  @PrimaryGeneratedColumn()
  idTipoDocumento: number;

  @Column()
  documento: string;
}