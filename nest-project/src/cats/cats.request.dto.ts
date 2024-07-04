import {Cats} from "./cats.entity";
export class CatsRequestDto {
    id: number;
    name: string;
    age: number;
    species: string;
    isCute: boolean;
    friendsId: number[];

    static fromEntity(cat: Cats, friendsId: number[]) : CatsDto {
        return {
            id: cat.id,
            name: cat.name,
            age: cat.age,
            species: cat.species,
            isCute: cat.isCute,
            friendsId: friendsId
        }
    }
}