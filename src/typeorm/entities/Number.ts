import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "numbers"})
export class Number {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({type: 'float'})
    number: number
}