import {Body, Controller, Get, Param, Req} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello/:id/:name')
  getHello(@Req() req, @Param() param: {id:string, name:string}): string {
    return this.appService.getHello(param);
  }
}
