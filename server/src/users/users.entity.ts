import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length: 50})
    email: string;

    @Column({ length: 255 })
    password: string;
}