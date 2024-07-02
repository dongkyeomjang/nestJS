import { Injectable } from '@nestjs/common';

@Injectable()
export class Cats {
    id: number;
    name: string;
    age: number;
    species: string;
    isCute: boolean;
    friends: string[];

    constructor(id: number, name: string, age: number, species: string, isCute: boolean, friends: string[]) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.species = species;
        this.isCute = isCute;
        this.friends = friends;
    }
}
