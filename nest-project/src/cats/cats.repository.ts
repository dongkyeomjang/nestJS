import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {Cats} from "./cats.entity";

@Injectable()
export class CatsRepository extends Repository<Cats> {
    constructor(private readonly dataSource: DataSource) {
        super(Cats, dataSource.createEntityManager());
    }

    async findAll(): Promise<Cats[]> {
        return await this.find();
    }

    async findById(id: number): Promise<Cats> {
        return await this.findOne({
            where: {
                id: id,
            }
        });
    }
}