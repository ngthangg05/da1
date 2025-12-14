import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fav } from './fav.entity';
import { FavGoodsInfo } from './interface/fav.interface';

Injectable();
export class FavRepository {
  constructor(
    @InjectRepository(Fav)
    private favRepository: Repository<Fav>,
  ) {}

  async createFav(goodsId: number, customerId: number): Promise<number> {
    const favInfo = this.favRepository.create({
      customerId,
      goodsId,
    });
    const fav = await this.favRepository.save(favInfo);
    return fav.id;
  }

  async getFav(customerId: number): Promise<FavGoodsInfo[]> {
    const query = await this.favRepository
      .createQueryBuilder('fav')
      .select([
        'fav.id AS favId',
        'fav.customerId AS customerId',
        'fav.goodsId AS goodsId',
        'goods.type AS type',
        'goods.goodName AS goodName',
        'goods.amount AS amount',
        'goods.price AS price',
        'goods.image AS image',
      ])
      .innerJoin('goods', 'goods', 'fav.goodsId = goods.id')
      .where('fav.customerId = :customerId', { customerId });
      console.log(query.getSql());
      return await query.getRawMany<FavGoodsInfo>();
  }

  async deleteFav(favId: number): Promise<void> {
    await this.favRepository.delete({ id: favId });
  }
}
