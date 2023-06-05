import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Mascota } from "./mascota.entity";
import { Usuario } from "src/user/entity/usuario.entity";

@Entity()
export class MascotaFavorita{

    @PrimaryGeneratedColumn()
    idMascotaUsuario: number
    @ManyToOne(() => Mascota, (mascota) => mascota.mascotaFavorita)
    mascota: Mascota

    @ManyToOne(() => Usuario, (usuario) => usuario.mascotaFavorita)
    usuario: Usuario
}