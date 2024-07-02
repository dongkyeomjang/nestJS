import {Cats} from "./cats";
export class CatsDto {
    id: number;
    name: string;
    age: number;
    species: string;
    isCute: boolean;
    friends: string[];

    static fromEntity(cat: Cats) : CatsDto {
        return {
            id: cat.id,
            name: cat.name,
            age: cat.age,
            species: cat.species,
            isCute: cat.isCute,
            friends: cat.friends
        }
    }
}