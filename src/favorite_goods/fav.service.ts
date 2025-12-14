import { Injectable } from '@nestjs/common';
import { FavRepository } from './fav.repository';

@Injectable()
export class FavService {
  constructor(private favRepository: FavRepository) {}

  async createFav(customerId: number, goodsId: number): Promise<number> {
    return await this.favRepository.createFav(goodsId, customerId);
  }
}
