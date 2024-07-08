import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {CatsFriends} from "./cats.friends.entity";
import {Cats} from "./cats.entity";

@Injectable()
export class CatsFriendsRepository extends Repository<CatsFriends>{
    constructor(private readonly dataSource: DataSource){
        super(CatsFriends, dataSource.createEntityManager());
    }
    async findAllByCat(cat: Cats): Promise<CatsFriends[]>{
        return await this.find({
            where:{
                cat: cat
            }
        });
    }
}