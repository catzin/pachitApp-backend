import { Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { Mascota } from './mascota.entity';

@Entity("mascotaimagen")
export class MascotaImagen{
    @PrimaryGeneratedColumn()
    idimagen:number;

    @Column()
    url:string;

    @ManyToOne(
        () => Mascota,
        (mascota) =>mascota.images,
        {onDelete: 'CASCADE'}

    )
    mascota:Mascota
}