import {
    Body,
    Controller, Delete,
    Get,
    Param,
    ParseIntPipe, Patch,
    Post,
    UseFilters,
    UseInterceptors
} from '@nestjs/common';
import {CatsService} from "./cats.service";
import {ResponseDto} from "../common/dto/response.dto";
import {HttpExceptionFilter} from "../http-exception.filter";
import {PositiveIntPipe} from "../common/pipes/positiveInt.pipe";
import {ResponseInterceptor} from "../common/interceptors/response.interceptor";
import {CatsDto} from "./cats.dto";

@Controller("/cats")
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catsService:CatsService) {}

    @Get()
    getAllCats() : ResponseDto<any> {
        return ResponseDto.ok(this.catsService.getAllCats());
    }

    @Get('/:id')
    getCatById(@Param('id', ParseIntPipe, PositiveIntPipe) catId : number) : ResponseDto<any> {
        return ResponseDto.created(this.catsService.getCatById(catId));
    }

    @Post()
    createCat(@Body() catDto: CatsDto) : ResponseDto<any> {
        return ResponseDto.created(this.catsService.createCat(catDto));
    }

    @Patch('/:id')
    patchCat(@Param('id', ParseIntPipe, PositiveIntPipe) catId : number, @Body() catDto: CatsDto) : ResponseDto<any> {
        return ResponseDto.created(this.catsService.updateCat(catId, catDto));
    }

    @Delete('/:id')
    deleteCat(@Param('id', ParseIntPipe, PositiveIntPipe) catId : number) : ResponseDto<any> {
        return ResponseDto.created(this.catsService.deleteCat(catId));
    }

}
