import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TiempoSeguimiento')
export class TiempoSeguimiento{

    @PrimaryGeneratedColumn()
    idTiempoSeguimiento : number;

    @Column({ length: 45 })
    lapso : string;

    @Column()
    dias: number;

}