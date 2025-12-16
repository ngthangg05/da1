import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerInfo } from './interface/customer.interface';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('user/create')
  async createCustomer(
    @Body() customerInfo: CustomerInfo,
  ): Promise<number | null> {
    return await this.customerService.createCustomer(
      customerInfo.username,
      customerInfo.password,
    );
  }

  @Post('user/get')
  async getCustomerId(
    @Body() customerInfo: CustomerInfo,
  ): Promise<number | undefined> {
    return await this.customerService.getCustomerId(
      customerInfo.username,
      customerInfo.password,
    );
  }
}
