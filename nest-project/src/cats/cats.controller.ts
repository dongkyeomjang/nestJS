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
import {CatsRequestDto} from "./cats.request.dto";

@Controller("/cats")
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catsService:CatsService) {}

    @Get()
    async getAllCats(): Promise<ResponseDto<any>> {
       return ResponseDto.ok(await this.catsService.getAllCats());
    }


    @Get('/:id')
    async getCatById(@Param('id', ParseIntPipe, PositiveIntPipe) catId : number) : Promise<ResponseDto<any>> {
        return ResponseDto.ok(await this.catsService.getCatById(catId));
    }

    @Post()
    async createCat(@Body() catRequestDto: CatsRequestDto) : Promise<ResponseDto<any>> {
        return ResponseDto.created(await this.catsService.createCat(catRequestDto));
    }

    @Patch('/:id')
    async patchCat(@Param('id', ParseIntPipe, PositiveIntPipe) catId : number, @Body() catRequestDto: CatsRequestDto) : Promise<ResponseDto<any>> {
        return ResponseDto.ok(await this.catsService.updateCat(catId, catRequestDto));
    }

    @Delete('/:id')
    async deleteCat(@Param('id', ParseIntPipe, PositiveIntPipe) catId : number) : Promise<ResponseDto<any>> {
        return ResponseDto.ok(await this.catsService.deleteCat(catId));
    }

}
