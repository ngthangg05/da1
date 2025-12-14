import { TypeOrmModule } from '@nestjs/typeorm';
import { FavController } from './fav.controller';
import { FavService } from './fav.service';
import { FavRepository } from './fav.repository';
import { Module } from '@nestjs/common';
import { Fav } from './fav.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fav])],
  controllers: [FavController],
  providers: [FavService, FavRepository],
  exports: [FavService],
})
export class FavModule {}
