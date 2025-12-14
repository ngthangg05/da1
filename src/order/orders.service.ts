import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Orders } from './orders.entity';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async saveOrder(orderInfo: Partial<Orders>): Promise<void> {
    await this.orderRepository.saveOrder(orderInfo);
  }
}
