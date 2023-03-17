import { Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { Mascota } from './mascota.entity';

@Entity("mascotaimage")
export class MascotaImage{
    @PrimaryGeneratedColumn()
    idimagen:number;

    @Column()
    url:string;

    @ManyToOne(
        () => Mascota,
        (mascota) =>mascota.images

    )
    mascota:Mascota
}