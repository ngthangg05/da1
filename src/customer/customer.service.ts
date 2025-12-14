import { Injectable } from '@nestjs/common';
import { Customers } from './customer.entity';
import { CustomerId } from './interface/customer.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async createCustomer(
    username: string,
    password: string,
  ): Promise<number | null> {
    const isExistCustomer = await this.customerRepository.getCustomerId(
      username,
      password,
    );
    if (isExistCustomer) {
      return null;
    }
    return await this.customerRepository.createCustomer(username, password);
  }

  async getCustomerId(
    username: string,
    password: string,
  ): Promise<number | undefined> {
    const customer = await this.customerRepository.getCustomerId(
      username,
      password,
    );

    return customer?.id;
  }
}
