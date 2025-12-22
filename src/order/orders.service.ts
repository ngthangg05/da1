import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Orders } from './orders.entity';
import { QueryRunner } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Goods } from 'src/goods/goods.entity';
import { OrderInfo } from './interface/orders.interface';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async saveOrder(
    orderInfo: Partial<Orders>,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.orderRepository.saveOrder(orderInfo, queryRunner);
  }

  async getOrders(): Promise<OrderInfo[]> {
    return await this.orderRepository.getOrders();
  }
}
