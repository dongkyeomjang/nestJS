import {Injectable} from "@nestjs/common";
import {Column, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Cats} from "./cats.entity";

@Injectable()
export class CatsFriends {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cats)
    @JoinColumn({name: 'cat_id'})
    cat: Cats;

    @OneToOne(() => Cats)
    @JoinColumn({name: 'friend_id'})
    friend: Cats;

    constructor(cat: Cats, friend: Cats) {
        this.cat = cat;
        this.friend = friend;
    }
}