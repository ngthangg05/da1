import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Or, QueryRunner, Repository } from 'typeorm';
import { Orders } from './orders.entity';
import { User } from 'src/user/user.entity';
import { Goods } from 'src/goods/goods.entity';
import { OrderInfo } from './interface/orders.interface';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) {}

  private getRunnerRepository(queryRunner?: QueryRunner): Repository<Orders> {
    return queryRunner
      ? queryRunner.manager.getRepository(Orders)
      : this.ordersRepository;
  }

  async saveOrder(
    orderInfo: Partial<Orders>,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.getRunnerRepository(queryRunner).save(orderInfo);
  }

  async getOrders(queryRunner?: QueryRunner): Promise<OrderInfo[]> {
    return await this.getRunnerRepository(queryRunner)
      .createQueryBuilder('orders')
      .select([
        'orders.id AS id',
        'customer.username AS customerName',
        'orders.createdAt AS createdAt',
        'goods.goodName AS goodName',
        'orders.amount AS amount',
        'orders.price AS price',
      ])
      .leftJoinAndSelect(User, 'customer', 'orders.customerId = customer.id')
      .leftJoinAndSelect(Goods, 'goods', 'orders.goodsId = goods.id')
      .getRawMany();
  }
}
