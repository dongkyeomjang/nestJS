import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    species: string;

    @Column()
    isCute: boolean;

    constructor(name: string, age: number, species: string, isCute: boolean) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.isCute = isCute;
    }
}