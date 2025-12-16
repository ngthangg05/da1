import { Injectable } from '@nestjs/common';
import { GoodsRepository } from './goods.repository';
import { Goods } from './goods.entity';

@Injectable()
export class GoodsService {
  constructor(private goodsRepository: GoodsRepository) {}

  async getAllGoods(): Promise<Goods[]> {
    return await this.goodsRepository.getAllGoods();
  }

  async getGoodsByTypeId(types: number[]): Promise<Goods[]> {
    return await this.goodsRepository.getGoodsTypeId(types);
  }

  async getGoodsInfo(goodsId: number): Promise<Goods | null> {
    return await this.goodsRepository.getGoodsInfo(goodsId);
  }

  async updateGoodsInfo(goodsInfo: Partial<Goods>): Promise<void> {
    await this.goodsRepository.updateGoodsInfo(goodsInfo);
  }
}
