import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'parentesco'
})
export class RelationShip {
    @PrimaryGeneratedColumn()
    idparentesco: number;

    @Column('text', {
        unique: true
    })
    parentesco: string;
}