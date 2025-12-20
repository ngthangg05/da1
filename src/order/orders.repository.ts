import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Or, QueryRunner, Repository } from 'typeorm';
import { Orders } from './orders.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) { }

  private getRunnerRepository(queryRunner?: QueryRunner): Repository<Orders> {
    return queryRunner
      ? queryRunner.manager.getRepository(Orders)
      : this.ordersRepository;
  }

  async saveOrder(orderInfo: Partial<Orders>, queryRunner?: QueryRunner): Promise<void> {
    await this.getRunnerRepository(queryRunner).save(orderInfo);
  }
}
