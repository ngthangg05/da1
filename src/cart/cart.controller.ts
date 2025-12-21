import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartGoodsInfo, CartInfo } from './interface/cart.interface';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { User } from 'src/common/user.decorator';
import { UserTokenInfo } from 'src/user/interface/customer.interface';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('cart/create')
  @UseGuards(JwtAuthGuard)
  async createCart(
    @User() user: UserTokenInfo,
    @Body() cartInfo: CartInfo,
  ): Promise<number | null> {
    return await this.cartService.createCart(
      user.id,
      cartInfo.goodsId,
      cartInfo.amount,
    );
  }

  @Get('cart/get')
  @UseGuards(JwtAuthGuard)
  async getCarts(@User() user: UserTokenInfo): Promise<CartGoodsInfo[]> {
    return await this.cartService.getCartInfos(user.id);
  }

  @Post('cart/delete')
  @UseGuards(JwtAuthGuard)
  async deleteCart(
    @User() user: UserTokenInfo,
    @Body() cartInfo: CartInfo,
  ): Promise<void> {
    await this.cartService.deleteCartGoods(
      user.id,
      cartInfo.goodsId,
      cartInfo.amount,
    );
  }

  @Post('cart/pay')
  @UseGuards(JwtAuthGuard)
  async payCart(@User() user: UserTokenInfo): Promise<number | null> {
    return await this.cartService.payCart(user.id);
  }
}
