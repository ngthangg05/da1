import { Injectable } from '@nestjs/common';
import { GoodsRepository } from './goods.repository';
import { Goods } from './goods.entity';

@Injectable()
export class GoodsService {
  constructor(private goodsRepository: GoodsRepository) {}

  async getGoodsByTypeId(types: number[]): Promise<Goods[]> {
    return await this.goodsRepository.getGoodsTypeId(types);
  }
}
