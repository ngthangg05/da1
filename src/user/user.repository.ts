import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDetail } from './interface/customer.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/order/orders.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createCustomer(
    username: string,
    passwordHash: string,
    role: number,
  ): Promise<number> {
    const customerInfo = this.userRepository.create({
      username,
      passwordHash,
      role,
    });
    const customer = await this.userRepository.save(customerInfo);
    return customer.id;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      select: ['id', 'username', 'role', 'passwordHash'],
      where: {
        username,
      },
    });
  }

  async getAllCustomer(): Promise<UserDetail[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoin(Orders, 'orders', 'orders.customerId = user.id')
      .select([
        'user.id AS id',
        'user.username AS username',
        'COALESCE(SUM(orders.price * orders.amount), 0) AS revenue',
      ])
      .where('user.role = :role', { role: 0 })
      .groupBy('user.id')
      .addGroupBy('user.username')
      .getRawMany();
  }
}
