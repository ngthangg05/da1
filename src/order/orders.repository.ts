import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Or, Repository } from 'typeorm';
import { Orders } from './orders.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) {}

  async saveOrder(orderInfo: Partial<Orders>): Promise<void> {
    await this.ordersRepository.save(orderInfo);
  }
}
