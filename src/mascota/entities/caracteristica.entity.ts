import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('caracteristica')
export class Caracteristica{
    @PrimaryGeneratedColumn()
    caracteristicaId: number;

    @Column({ length: 45 })
    nombre : string;
    
}