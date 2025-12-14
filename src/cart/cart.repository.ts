import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartGoodsInfo } from './interface/cart.interface';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async updateCartRecord(cartInfo: Partial<Cart>): Promise<void> {
    await this.cartRepository.save(cartInfo);
  }

  async createCartRecord(
    customerId: number,
    goodsId: number,
    amount: number,
  ): Promise<number> {
    const cartInfo = this.cartRepository.create({
      customerId,
      goodsId,
      amount,
    });
    const cart = await this.cartRepository.save(cartInfo);
    return cart.id;
  }

  async getCartInfosByCustomerIdAndGoodsId(
    customerId: number,
    goodsId: number,
  ) {
    return await this.cartRepository.findOne({
      where: { customerId, goodsId },
    });
  }

  async getCartInfos(customerId: number): Promise<CartGoodsInfo[]> {
    return await this.cartRepository
      .createQueryBuilder('cart')
      .select([
        'cart.id AS cartId',
        'cart.customerId AS customerId',
        'cart.goodsId AS goodsId',
        'cart.amount AS cartAmount',
        'goods.type AS type',
        'goods.goodName AS goodName',
        'goods.price AS price',
        'goods.image AS image',
      ])
      .innerJoin('goods', 'goods', 'cart.goodsId = goods.id')
      .where('cart.customerId = :customerId', { customerId })
      .getRawMany<CartGoodsInfo>();
  }

  async deleteCartById(cartId: number): Promise<void> {
    await this.cartRepository.delete({ id: cartId });
  }
}
