import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fav } from './fav,entity';

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
  async getFav(customerId:number){
    return await this.favRepository.createQueryBuilder()
  }
}
