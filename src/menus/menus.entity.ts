import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Menus {

    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    @Column()
    key: string;

    @Column()
    label: string;

    @Column()
    path: string;


}
