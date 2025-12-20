import { QueryRunner, Repository } from 'typeorm';
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

  private getRunnerRepository(queryRunner?: QueryRunner): Repository<Cart> {
    return queryRunner
      ? queryRunner.manager.getRepository(Cart)
      : this.cartRepository;
  }

  async updateCartRecord(
    cartInfo: Partial<Cart>,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.getRunnerRepository(queryRunner).save(cartInfo);
  }

  async createCartRecord(
    customerId: number,
    goodsId: number,
    amount: number,
    queryRunner?: QueryRunner,
  ): Promise<number> {
    const repo = this.getRunnerRepository(queryRunner);

    const cartInfo = repo.create({
      customerId,
      goodsId,
      amount,
    });
    const cart = await repo.save(cartInfo);
    return cart.id;
  }

  async getCartInfosByCustomerIdAndGoodsId(
    customerId: number,
    goodsId: number,
    queryRunner?: QueryRunner,
  ) {
    return await this.getRunnerRepository(queryRunner).findOne({
      where: { customerId, goodsId },
    });
  }

  async getCartInfos(
    customerId: number,
    queryRunner?: QueryRunner,
  ): Promise<CartGoodsInfo[]> {
    return await this.getRunnerRepository(queryRunner)
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

  async deleteCartById(
    cartId: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.getRunnerRepository(queryRunner).delete({ id: cartId });
  }
}
