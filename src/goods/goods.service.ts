import { Injectable } from '@nestjs/common';
import { GoodsRepository } from './goods.repository';
import { Goods } from './goods.entity';
import { Role } from 'src/common/constant';

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

  async updateGoodsInfo(
    goodId: number,
    goodsInfo: Partial<Goods>,
    userRole: Role,
  ): Promise<void> {
    if (userRole !== Role.ADMIN) {
      throw new Error('Unauthorized');
    }
    await this.goodsRepository.updateGoodsById(goodId, goodsInfo);
  }

  async updateGoodsAmount(goodId: number, amount: number): Promise<void> {
    const goodsInfo: Partial<Goods> = {
      amount,
    };
    await this.goodsRepository.updateGoodsById(goodId, goodsInfo);
  }

  async createGoods(
    type: number,
    amount: number,
    goodName: string,
    price: number,
    image: string,
    userRole: Role,
  ): Promise<number> {
    if (userRole !== Role.ADMIN) {
      throw new Error('Unauthorized');
    }
    return await this.goodsRepository.createGoods(
      type,
      amount,
      goodName,
      price,
      image,
    );
  }

  async deleteGoods(goodsId: number, userRole: Role): Promise<void> {
    if (userRole !== Role.ADMIN) {
      throw new Error('Unauthorized');
    }
    await this.goodsRepository.deleteGoods(goodsId);
  }
}
