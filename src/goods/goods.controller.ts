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
import { User } from 'src/user/user.decorator';
import { Role } from 'src/common/constant';

@Controller()
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get('goods')
  @UseGuards(JwtAuthGuard)
  async getGoodsByTypeId(
    @Query('typeIds') typeIds?: number[],
  ): Promise<Goods[]> {
    if (!typeIds) {
      return await this.goodsService.getAllGoods();
    }
    return await this.goodsService.getGoodsByTypeId(typeIds);
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
      userRole,
    );
  }

  @Post('goods/update')
  @UseGuards(JwtAuthGuard)
  async updateGoods(
    @User('role') userRole: Role,
    @Body() goodsInfo: Goods,
  ): Promise<void> {
    await this.goodsService.updateGoodsInfo(goodsInfo.id, goodsInfo, userRole);
  }

  @Post('goods/delete')
  @UseGuards(JwtAuthGuard)
  async deleteGoods(
    @User('role') userRole: Role,
    @Body('goodsId') goodsId: number,
  ): Promise<void> {
    await this.goodsService.deleteGoods(goodsId, userRole);
  }
}
