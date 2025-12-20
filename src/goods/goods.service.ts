import { Injectable } from '@nestjs/common';
import { GoodsRepository } from './goods.repository';
import { Goods } from './goods.entity';
import { Role } from 'src/common/constant';
import { QueryRunner } from 'typeorm';

@Injectable()
export class GoodsService {
  constructor(private goodsRepository: GoodsRepository) {}

  async getAllGoods(queryRunner?: QueryRunner): Promise<Goods[]> {
    return await this.goodsRepository.getAllGoods(queryRunner);
  }

  async getGoodsByTypeId(
    types: number[],
    queryRunner?: QueryRunner,
  ): Promise<Goods[]> {
    return await this.goodsRepository.getGoodsTypeId(types, queryRunner);
  }

  async getGoodsInfo(
    goodsId: number,
    queryRunner?: QueryRunner,
  ): Promise<Goods | null> {
    return await this.goodsRepository.getGoodsInfo(goodsId, queryRunner);
  }

  async updateGoodsInfo(
    goodId: number,
    goodsInfo: Partial<Goods>,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.goodsRepository.updateGoodsById(goodId, goodsInfo, queryRunner);
  }

  async updateGoodsAmount(
    goodId: number,
    amount: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    const goodsInfo: Partial<Goods> = {
      amount,
    };
    await this.goodsRepository.updateGoodsById(goodId, goodsInfo, queryRunner);
  }

  async createGoods(
    type: number,
    amount: number,
    goodName: string,
    price: number,
    image: string,
    queryRunner?: QueryRunner,
  ): Promise<number> {
    return await this.goodsRepository.createGoods(
      type,
      amount,
      goodName,
      price,
      image,
      queryRunner,
    );
  }

  async deleteGoods(goodsId: number, queryRunner?: QueryRunner): Promise<void> {
    await this.goodsRepository.deleteGoods(goodsId, queryRunner);
  }
}
