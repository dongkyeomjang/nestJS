import {Injectable, Param} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(@Param() param): string {
    return 'Hello World!' + param.id + param.name;
  }
}
