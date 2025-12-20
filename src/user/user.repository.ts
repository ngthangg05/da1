import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserTokenInfo } from './interface/customer.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
}
