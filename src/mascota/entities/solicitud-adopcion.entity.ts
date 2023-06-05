import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Mascota } from "./mascota.entity";
import { Usuario } from "src/user/entity/usuario.entity";

@Entity()
export class SolicitudAdopcion{
    @PrimaryGeneratedColumn()
    idSolicitudAdopcion: number

    @Column({ type: 'date' })
    fechaSolicitud: Date;

    @Column()
    estatus: number;

    @Column()
    motivo : string;

    @ManyToOne(() => Mascota, (mascota) => mascota.solicitudAdopcion)
    mascota: Mascota

    @ManyToOne(() => Usuario, (usuario) => usuario.solicitudAdopcion)
    usuario: Usuario
}