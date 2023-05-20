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
    estatus: number

    @ManyToOne(() => Mascota)
    mascota: Mascota

    @ManyToOne(() => Usuario)
    usuario: Usuario
}