import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Goods } from './goods.entity';
import { GoodsService } from './goods.service';
import { GoodsInfo } from './interface/goods.interface';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { User } from 'src/common/user.decorator';
import { Role } from 'src/common/constant';
import { Roles } from 'src/common/roles.decorator';
import { UserTokenInfo } from 'src/user/interface/customer.interface';

@Controller()
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get('goods')
  @UseGuards(JwtAuthGuard)
  async getGoodsByTypeId(
    @User() user: UserTokenInfo,
    @Query('typeIds') typeIds?: number[],
  ): Promise<Goods[]> {
    if (!typeIds) {
      return await this.goodsService.getAllGoods(user.role);
    }
    return await this.goodsService.getGoodsByTypeId(user.role, typeIds);
  }

  @Get('goods-details')
  @UseGuards(JwtAuthGuard)
  async getGoodsDetails(
    @Query('goodsId') goodsId: number,
  ): Promise<Goods | null> {
    return await this.goodsService.getGoodsInfo(goodsId);
  }

  @Post('goods/create')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async createGoods(
    @User('role') userRole: Role,
    @Body() goodsInfo: GoodsInfo,
  ): Promise<number> {
    return await this.goodsService.createGoods(
      goodsInfo.typeId,
      goodsInfo.amount,
      goodsInfo.name,
      goodsInfo.price,
      goodsInfo.image,
    );
  }

  @Post('goods/update')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async updateGoods(@Body() goodsInfo: Goods): Promise<void> {
    await this.goodsService.updateGoodsInfo(goodsInfo.id, goodsInfo);
  }

  @Post('goods/delete')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async deleteGoods(@Body('goodsId') goodsId: number): Promise<void> {
    await this.goodsService.deleteGoods(goodsId);
  }
}
