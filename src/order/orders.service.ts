import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Orders } from './orders.entity';
import { QueryRunner } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async saveOrder(
    orderInfo: Partial<Orders>,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.orderRepository.saveOrder(orderInfo, queryRunner);
  }
}
