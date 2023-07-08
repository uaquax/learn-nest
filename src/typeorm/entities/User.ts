import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Number } from './Number';
import { Exclude } from "class-transformer";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({unique: true})
    username: string

    @Column()
    @Exclude()
    password: string

    @OneToOne(() => Number)
    @JoinColumn()
    number: Number

    @Column()
    createdAt: Date;
}

export class SerializedUser {
    id: number;
    username: string

    @Exclude()
    password: string

    number: Number
    createdAt: Date;
}