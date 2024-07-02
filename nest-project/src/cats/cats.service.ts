import {Get, Injectable, Param} from '@nestjs/common';
import {Cats} from "./cats";
import {CatsDto} from "./cats.dto";
import {CommonException} from "../common/exceptions/common.exception";
import {ErrorCode} from "../common/exceptions/error-code";

@Injectable()
export class CatsService {
    getAllCats() : CatsDto[] {
        const cat = new Cats(1, "Tom", 3, "Cat", true, ["Jerry"]);
        const catDtos : CatsDto[] = [];
        catDtos.push(CatsDto.fromEntity(cat));
        return catDtos;
    }

    getCatById(catId: number) : CatsDto {
        if(catId === 2) {
            const cat: Cats = new Cats(2, "Kyeom", 25, "Cat", true, ["Tom"]);
            return CatsDto.fromEntity(cat);
        }
        else {
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
