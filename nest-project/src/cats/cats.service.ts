import {Injectable, UseFilters} from '@nestjs/common';
import {CatsDto} from "./cats.dto";
import {CommonException} from "../common/exceptions/common.exception";
import {ErrorCode} from "../common/exceptions/error-code";
import {CatsRepository} from "./cats.repository";
import {Cats} from "./cats.entity";
import {HttpExceptionFilter} from "../http-exception.filter";
import {CatsFriendsRepository} from "./cats.friends.repository";
import {CatsFriends} from "./cats.friends.entity";
import {CatsRequestDto} from "./cats.request.dto";

@Injectable()
@UseFilters(HttpExceptionFilter)
export class CatsService {
    constructor(
        private readonly catsRepository:CatsRepository,
        private readonly friendRepository: CatsFriendsRepository
    ) {}

    async getAllCats() : Promise<CatsDto[]> {
        const cats : Cats[] = await this.catsRepository.findAll();
        if(cats === undefined) {
            throw new CommonException(ErrorCode.NOT_FOUND_CATS);
        }
        const catsDtos : CatsDto[] = [];
        cats.map(async cat => {
            let friends : Cats[] = await this.friendRepository.findAllByCat(cat).then(
                catFriends => {
                    return catFriends.map(catFriends => catFriends.friend);
                }
            );
            catsDtos.push(CatsDto.fromEntity(cat, friends));
        });
        return catsDtos;
    }
    async getCatById(catId: number) : Promise<CatsDto> {
        const cat: Cats = await this.catsRepository.findById(catId);
        if(cat === undefined){
            throw new CommonException(ErrorCode.NOT_FOUND_CATS);
        }
        let friends : Cats[] = await this.friendRepository.findAllByCat(cat).then(
            catFriends => {
                return catFriends.map(catFriends => catFriends.friend);
            }
        );
        return CatsDto.fromEntity(cat, friends);
    }

    async createCat(catsRequestDto: CatsRequestDto) : Promise<CatsDto> {
        let friendsOfCat : Cats[] = [];
        for (const friendId of catsRequestDto.friendsId) {
            const friendOfCat : Cats = await this.catsRepository.findById(friendId);
            if (friendOfCat === undefined) {
                throw new CommonException(ErrorCode.NOT_FOUND_CATS);
            }
            friendsOfCat.push(friendOfCat);
        }
        const cat : Cats = await this.catsRepository.save(
            new Cats(catsRequestDto.name, catsRequestDto.age, catsRequestDto.species, catsRequestDto.isCute)
        );
        if(!(friendsOfCat.length === 0)){
            this.friendRepository.save(friendsOfCat.map(
                friend => {
                    return new CatsFriends(cat, friend);
                }
            ))
        }
        return CatsDto.fromEntity(cat, friendsOfCat);
    }

    async updateCat(catId: number, catRequestDto: CatsRequestDto) : Promise<CatsDto> {
        let cat : Cats = await this.catsRepository.findById(catId);
        if (cat === undefined) {
            throw new CommonException(ErrorCode.NOT_FOUND_CATS);
        }
        let friends = await this.friendRepository.findAllByCat(cat);
        if (friends !== undefined) {
            let friendsFormOfCats : Cats[] = await Promise.all(
                friends.map(
                    friend =>  {
                        return this.catsRepository.findById(friend.friend.id)
                    }
                )
            );
            if (!(catRequestDto.friendsId === undefined)) {
                await this.friendRepository.delete(
                    friends.map(friend => friend.id)
                );
                let newFriends : Cats[] = await Promise.all(
                    catRequestDto.friendsId.map(
                        friendId => {
                            return this.catsRepository.findById(friendId);
                        }
                    )
                )
                this.friendRepository.save(newFriends.map(
                    friend => {
                        return new CatsFriends(cat, friend);
                    }
                ));
            }
        }
        if (catRequestDto.age !== undefined) {
            cat.age = catRequestDto.age;
        }
        if (catRequestDto.name !== undefined) {
            cat.name = catRequestDto.name;
        }
        if (catRequestDto.species !== undefined) {
            cat.species = catRequestDto.species;
        }
        if (catRequestDto.isCute !== undefined) {
            cat.isCute = catRequestDto.isCute;
        }
        cat = await this.catsRepository.save(cat);

        return CatsDto.fromEntity(cat, friends.map(friend => friend.friend));
    }

    async deleteCat(catId: number) : Promise<void> {
        const cat : Cats = await this.catsRepository.findById(catId);
        if (cat === undefined) {
            throw new CommonException(ErrorCode.NOT_FOUND_CATS);
        }
        await this.friendRepository.delete(
            (await this.friendRepository.findAllByCat(cat)).map(friend => friend.id)
        );
        await this.catsRepository.delete(catId);
    }
}
