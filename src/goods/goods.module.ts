import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from './goods.entity';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { GoodsRepository } from './goods.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Goods])],
  controllers: [GoodsController],
  providers: [GoodsService, GoodsRepository],
  exports: [GoodsService],
})
export class GoodsModule {}
