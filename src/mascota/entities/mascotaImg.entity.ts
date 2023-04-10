import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Mascota } from './mascota.entity';
import { Imagenes } from 'src/files/entities/imagenes.entity';

@Entity('mascotaImg')
export class MascotaImagenn {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80 })
    path: string;
    

    @ManyToOne(() => Imagenes, (imagen) => imagen.mascotaImgs,
    {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'idimagenes' })
    imagen: Imagenes;
    
    @ManyToOne(() => Mascota, (mascota) => mascota.mascotaImgs,
    {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'idmascota' })
    mascota: Mascota;

}