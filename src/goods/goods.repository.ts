import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goods } from './goods.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class GoodsRepository {
  constructor(
    @InjectRepository(Goods)
    private goodsRepository: Repository<Goods>,
  ) {}

  async getAllGoods(): Promise<Goods[]> {
    return await this.goodsRepository.find({
      select: ['id', 'type', 'amount', 'goodName', 'price', 'image'],
    });
  }

  async getGoodsTypeId(typeIds: number[]): Promise<Goods[]> {
    return await this.goodsRepository.find({
      select: ['id', 'type', 'amount', 'goodName', 'price', 'image'],
      where: {
        type: In(typeIds),
      },
    });
  }

  async getGoodsInfo(goodsId: number): Promise<Goods | null> {
    return await this.goodsRepository.findOne({
      select: ['id', 'type', 'amount', 'goodName', 'price', 'image'],
      where: {
        id: goodsId,
      },
    });
  }

  async updateGoodsById(
    goodId: number,
    goodsInfo: Partial<Goods>,
  ): Promise<void> {
    await this.goodsRepository.update({ id: goodId }, goodsInfo);
  }

  async createGoods(
    type: number,
    amount: number,
    goodName: string,
    price: number,
    image: string,
  ): Promise<number> {
    const goodsInfo = await this.goodsRepository.create({
      type,
      amount,
      goodName,
      price,
      image,
    });
    const goods = await this.goodsRepository.save(goodsInfo);
    return goods.id;
  }

  async deleteGoods(goodsId: number): Promise<void> {
    await this.goodsRepository.delete({ id: goodsId });
  }
}
