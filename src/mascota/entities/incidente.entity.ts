import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mascota } from "./mascota.entity";

@Entity('incidente')
export class incidente{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @Column()
    gasto : number;

    @Column()
    fechaCreacion: Date;

    @ManyToOne(() => Mascota, mascota => mascota.incidencias)
    mascota: Mascota;

}