import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { Role } from 'src/common/constant';
import { Roles } from 'src/common/roles.decorator';
import { OrderService } from './orders.service';
import { Orders } from './orders.entity';
import { OrderInfo } from './interface/orders.interface';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async getOrders(): Promise<OrderInfo[]> {
    return await this.orderService.getOrders();
  }
}
