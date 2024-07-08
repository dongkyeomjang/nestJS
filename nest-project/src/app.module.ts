import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import {LoggerMiddleware} from "./common/middlewares/logger/logger.middleware";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cats} from "./cats/cats.entity";
import {CatsFriends} from "./cats/cats.friends.entity";

@Module({
  imports: [CatsModule,
      TypeOrmModule.forRoot({
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '0304',
        database: 'cats',
        entities: [Cats, CatsFriends],
        synchronize: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('*');
  }
}
