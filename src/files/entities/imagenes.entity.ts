import { MascotaImagen } from 'src/mascota/entities/mascota-imagen.entity';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { MascotaImagenn } from 'src/mascota/entities/mascotaImg.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';

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

    @OneToMany(() => MascotaImagenn, (mascotaImg) => mascotaImg.imagen,
    {onDelete: 'CASCADE'})
  mascotaImgs: MascotaImagenn[];
} 