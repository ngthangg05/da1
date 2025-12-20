import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CartGoodsInfo } from './interface/cart.interface';
import { GoodsService } from 'src/goods/goods.service';
import { Goods } from 'src/goods/goods.entity';
import { Orders } from 'src/order/orders.entity';
import { OrderService } from 'src/order/orders.service';

@Injectable()
export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private goodsService: GoodsService,
    private orderService: OrderService,
  ) {}

  async createCart(
    customerId: number,
    goodsId: number,
    amount: number,
  ): Promise<number | null> {
    const oldCartInfo =
      await this.cartRepository.getCartInfosByCustomerIdAndGoodsId(
        customerId,
        goodsId,
      );
    if (oldCartInfo) {
      oldCartInfo.amount = oldCartInfo.amount + amount;
      await this.cartRepository.updateCartRecord(oldCartInfo);
      return oldCartInfo.id;
    }
    return await this.cartRepository.createCartRecord(
      customerId,
      goodsId,
      amount,
    );
  }

  async getCartInfos(customerId: number): Promise<CartGoodsInfo[]> {
    return await this.cartRepository.getCartInfos(customerId);
  }

  async deleteCartGoods(
    customerId: number,
    goodsId: number,
    amount: number,
  ): Promise<void> {
    const oldCartInfo =
      await this.cartRepository.getCartInfosByCustomerIdAndGoodsId(
        customerId,
        goodsId,
      );

    if (oldCartInfo) {
      const newAmount = oldCartInfo.amount - amount;
      if (newAmount <= 0) {
        await this.cartRepository.deleteCartById(oldCartInfo.id);
      } else {
        oldCartInfo.amount = newAmount;
        const updatedCart =
          await this.cartRepository.updateCartRecord(oldCartInfo);
      }
    }
  }

  async payCart(customerId: number): Promise<number | null> {
    let totalCost = 0;
    let goodsInfos: Goods[] = [];
    try {
      const cartInfos = await this.cartRepository.getCartInfos(customerId);
      for (const cartInfo of cartInfos) {
        const goodsInfo = await this.goodsService.getGoodsInfo(
          cartInfo.goodsId,
        );
        if (!goodsInfo || goodsInfo.amount < cartInfo.cartAmount) {
          throw new Error(
            'Insufficient stock for goods ID ' + cartInfo.goodsId,
          );
        }
        goodsInfo.amount = goodsInfo.amount - cartInfo.cartAmount;
        goodsInfos.push(goodsInfo);
        const cost = cartInfo.price * cartInfo.cartAmount;
        totalCost = totalCost + cost;
      }
      for (const cartInfo of cartInfos) {
        const orderInfo: Partial<Orders> = {
          customerId: cartInfo.customerId,
          goodsId: cartInfo.goodsId,
          amount: cartInfo.cartAmount,
          price: cartInfo.price,
          createdAt: new Date(),
        };
        await this.orderService.saveOrder(orderInfo);
        await this.cartRepository.deleteCartById(cartInfo.cartId);
      }
      for (const goodsInfo of goodsInfos) {
        await this.goodsService.updateGoodsAmount(
          goodsInfo.id,
          goodsInfo.amount,
        );
      }
    } catch (error) {
      console.log('Payment failed: ' + error.message);
      return null;
    }
    return totalCost;
  }
}
