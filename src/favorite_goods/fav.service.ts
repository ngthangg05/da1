import { Injectable } from '@nestjs/common';
import { FavRepository } from './fav.repository';
import { FavGoodsInfo } from './interface/fav.interface';

@Injectable()
export class FavService {
  constructor(private favRepository: FavRepository) {}

  async createFav(customerId: number, goodsId: number): Promise<number> {
    return await this.favRepository.createFav(goodsId, customerId);
  }

  async getFav(customerId: number): Promise<FavGoodsInfo[]> {
    console.log(customerId);
    return await this.favRepository.getFav(customerId);
  }

  async deleteFav(favId: number): Promise<void> {
    await this.favRepository.deleteFav(favId);
  }
}
