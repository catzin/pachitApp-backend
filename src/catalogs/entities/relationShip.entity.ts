import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'parentesco'
})
export class RelationShip {
    @PrimaryGeneratedColumn()
    idparentesco: number;

    @Column({ length: 80 })
    parentesco: string;
}