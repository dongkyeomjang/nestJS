import {Cats} from "./cats.entity";
export class CatsDto {
    id: number;
    name: string;
    age: number;
    species: string;
    isCute: boolean;
    friends: string[];

    static fromEntity(cat: Cats, friends: Cats[]) : CatsDto {
        return {
            id: cat.id,
            name: cat.name,
            age: cat.age,
            species: cat.species,
            isCute: cat.isCute,
            friends: friends.map(friend => friend.name)
        }
    }
}