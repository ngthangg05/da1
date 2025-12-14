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

  async updateGoodsInfo(goodsInfo: Partial<Goods>): Promise<void> {
    await this.goodsRepository.save(goodsInfo);
  }
}
