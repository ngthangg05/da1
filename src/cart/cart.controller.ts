import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartGoodsInfo, CartInfo } from './interface/cart.interface';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('cart/create')
  @UseGuards(JwtAuthGuard)
  async createCart(@Body() cartInfo: CartInfo): Promise<number | null> {
    return await this.cartService.createCart(
      cartInfo.customerId,
      cartInfo.goodsId,
      cartInfo.amount,
    );
  }

  @Get('cart/get')
  @UseGuards(JwtAuthGuard)
  async getCarts(
    @Query('customerId') customerId: number,
  ): Promise<CartGoodsInfo[]> {
    return await this.cartService.getCartInfos(customerId);
  }

  @Post('cart/delete')
  @UseGuards(JwtAuthGuard)
  async deleteCart(@Body() cartInfo: CartInfo): Promise<void> {
    await this.cartService.deleteCartGoods(
      cartInfo.customerId,
      cartInfo.goodsId,
      cartInfo.amount,
    );
  }

  @Post('cart/pay')
  @UseGuards(JwtAuthGuard)
  async payCart(
    @Body('customerId') customerId: number,
  ): Promise<number | null> {
    return await this.cartService.payCart(customerId);
  }
}
