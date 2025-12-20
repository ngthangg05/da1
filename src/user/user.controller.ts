import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfo } from './interface/customer.interface';

@Controller()
export class UserController {
  constructor(private readonly customerService: UserService) {}

  @Post('user/create')
  async createCustomer(@Body() customerInfo: UserInfo): Promise<number | null> {
    return await this.customerService.createCustomer(
      customerInfo.username,
      customerInfo.password,
    );
  }

  @Post('user/login')
  async getCustomerId(
    @Body() customerInfo: UserInfo,
  ): Promise<{ access_token: string } | null> {
    return await this.customerService.login(
      customerInfo.username,
      customerInfo.password,
    );
  }
}
