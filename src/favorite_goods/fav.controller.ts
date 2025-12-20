import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavGoodsInfo, FavInfo } from './interface/fav.interface';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller()
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Post('fav/create')
  @UseGuards(JwtAuthGuard)
  async createFav(@Body() favInfo: FavInfo): Promise<number> {
    return await this.favService.createFav(favInfo.customerId, favInfo.goodsId);
  }

  @Get('fav/get')
  @UseGuards(JwtAuthGuard)
  async getFavs(
    @Query('customerId') customerId: number,
  ): Promise<FavGoodsInfo[]> {
    return await this.favService.getFav(customerId);
  }

  @Post('fav/delete')
  @UseGuards(JwtAuthGuard)
  async deleteFav(@Body('favId') favId: number): Promise<void> {
    await this.favService.deleteFav(favId);
  }
}
