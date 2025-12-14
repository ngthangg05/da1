import { Body, Controller, Post, Query } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavInfo } from './interface/fav.interface';

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
  ): Promise<number | undefined> {
    return await this.customerService.getCustomerId(
      customerInfo.username,
      customerInfo.password,
    );
  }
}
