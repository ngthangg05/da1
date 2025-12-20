import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CartGoodsInfo } from './interface/cart.interface';
import { GoodsService } from 'src/goods/goods.service';
import { Goods } from 'src/goods/goods.entity';
import { Orders } from 'src/order/orders.entity';
import { OrderService } from 'src/order/orders.service';
import { DataSource, QueryRunner } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly goodsService: GoodsService,
    private readonly orderService: OrderService,
    private readonly dataSource: DataSource,
  ) {}

  async createCart(
    customerId: number,
    goodsId: number,
    amount: number,
  ): Promise<number | null> {
    let cartId: number | null = null;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const oldCartInfo =
        await this.cartRepository.getCartInfosByCustomerIdAndGoodsId(
          customerId,
          goodsId,
          queryRunner,
        );
      if (oldCartInfo) {
        oldCartInfo.amount = oldCartInfo.amount + amount;
        await this.cartRepository.updateCartRecord(oldCartInfo, queryRunner);
        cartId = oldCartInfo.id;
      } else {
        cartId = await this.cartRepository.createCartRecord(
          customerId,
          goodsId,
          amount,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('Create cart failed: ' + error.message);
      throw error;
    } finally {
      await queryRunner.release();
    }
    return cartId;
  }

  async getCartInfos(customerId: number): Promise<CartGoodsInfo[]> {
    return await this.cartRepository.getCartInfos(customerId);
  }

  async deleteCartGoods(
    customerId: number,
    goodsId: number,
    amount: number,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const oldCartInfo =
        await this.cartRepository.getCartInfosByCustomerIdAndGoodsId(
          customerId,
          goodsId,
          queryRunner,
        );

      if (oldCartInfo) {
        const newAmount = oldCartInfo.amount - amount;
        if (newAmount <= 0) {
          await this.cartRepository.deleteCartById(oldCartInfo.id, queryRunner);
        } else {
          oldCartInfo.amount = newAmount;
          await this.cartRepository.updateCartRecord(oldCartInfo, queryRunner);
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('Delete cart failed: ' + error.message);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async payCart(customerId: number): Promise<number | null> {
    let totalCost = 0;
    let goodsInfos: Goods[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const cartInfos = await this.cartRepository.getCartInfos(
        customerId,
        queryRunner,
      );
      for (const cartInfo of cartInfos) {
        const goodsInfo = await this.goodsService.getGoodsInfo(
          cartInfo.goodsId,
          queryRunner,
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
        await this.orderService.saveOrder(orderInfo, queryRunner);
        await this.cartRepository.deleteCartById(cartInfo.cartId, queryRunner);
      }
      for (const goodsInfo of goodsInfos) {
        await this.goodsService.updateGoodsAmount(
          goodsInfo.id,
          goodsInfo.amount,
          queryRunner,
        );
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('Payment failed: ' + error.message);
      throw error;
    } finally {
      await queryRunner.release();
    }
    return totalCost;
  }
}
