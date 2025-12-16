import { Controller, Get, Param, Query } from '@nestjs/common';
import { Goods } from './goods.entity';
import { GoodsService } from './goods.service';

@Controller()
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get('goods')
  async getGoodsByTypeId(
    @Query('typeIds') typeIds?: number[],
  ): Promise<Goods[]> {
    if (!typeIds) {
      return await this.goodsService.getAllGoods();
    }
    return await this.goodsService.getGoodsByTypeId(typeIds);
  }

  @Get('goods-details')
  async getGoodsDetails(@Query('goodsId') goodsId: number): Promise<Goods | null> {
    return await this.goodsService.getGoodsInfo(goodsId);
  }
}
