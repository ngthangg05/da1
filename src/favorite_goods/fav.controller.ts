import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavGoodsInfo, FavInfo } from './interface/fav.interface';

@Controller()
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Post('fav/create')
  async createFav(@Body() favInfo: FavInfo): Promise<number> {
    return await this.favService.createFav(favInfo.customerId, favInfo.goodsId);
  }

  @Get('fav/get')
  async getFavs(
    @Query('customerId') customerId: number,
  ): Promise<FavGoodsInfo[]> {
    return await this.favService.getFav(customerId);
  }

  @Post('fav/delete')
  async deleteFav(@Body('favId') favId: number): Promise<void> {
    await this.favService.deleteFav(favId);
  }
}
