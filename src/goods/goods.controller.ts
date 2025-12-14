import { Controller, Get, Param, Query } from '@nestjs/common';
import { Goods } from './goods.entity';
import { GoodsService } from './goods.service';

@Controller()
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get('goods')
  async getCustomerId(@Query('typeIds') typeIds: number[]): Promise<Goods[]> {
    return await this.goodsService.getGoodsByTypeId(typeIds);
  }
}
