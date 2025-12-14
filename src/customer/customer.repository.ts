import { Repository } from 'typeorm';
import { Customers } from './customer.entity';
import { CustomerId } from './interface/customer.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customers)
    private customerRepository: Repository<Customers>,
  ) {}
  async createCustomer(username: string, password: string): Promise<number> {
    const customerInfo = this.customerRepository.create({
      username,
      passwordHash: password,
    });
    const customer = await this.customerRepository.save(customerInfo);
    return customer.id;
  }

  async getCustomerId(
    username: string,
    password: string,
  ): Promise<CustomerId | null> {
    return await this.customerRepository.findOne({
      select: ['id'],
      where: {
        username,
        passwordHash: password,
      },
    });
  }
}
