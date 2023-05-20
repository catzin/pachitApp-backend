import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Mascota } from "./mascota.entity";
import { Usuario } from "src/user/entity/usuario.entity";

@Entity()
export class MascotaFavorita{

    @PrimaryGeneratedColumn()
    idMascotaUsuario: number

    // @Column()
    // idMascotaUsuario: number

    // @Column()
    // idMascotaUsuario: number

    @ManyToMany(() => Mascota)
    mascota: Mascota

    @ManyToMany(() => Usuario)
    usuario: Usuario
}