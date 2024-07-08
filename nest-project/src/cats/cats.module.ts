import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats } from './cats.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CatsRepository} from "./cats.repository";
import {CatsFriendsRepository} from "./cats.friends.repository";
import {CatsFriends} from "./cats.friends.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cats,CatsFriends])],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository, CatsFriendsRepository],
})
export class CatsModule {}
