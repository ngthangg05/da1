import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavGoodsInfo } from './interface/fav.interface';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { UserTokenInfo } from 'src/user/interface/customer.interface';
import { User } from 'src/common/user.decorator';

@Controller()
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Post('fav/create')
  @UseGuards(JwtAuthGuard)
  async createFav(@User() user: UserTokenInfo, @Body('goodsId') goodsId: number): Promise<number> {
    return await this.favService.createFav(user.id, goodsId);
  }

  @Get('fav/get')
  @UseGuards(JwtAuthGuard)
  async getFavs(@User() user: UserTokenInfo): Promise<FavGoodsInfo[]> {
    return await this.favService.getFav(user.id);
  }

  @Post('fav/delete')
  @UseGuards(JwtAuthGuard)
  async deleteFav(@Body('favId') favId: number): Promise<void> {
    await this.favService.deleteFav(favId);
  }
}
