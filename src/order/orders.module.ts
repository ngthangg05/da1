import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';
import { Orders } from './orders.entity';
import { OrderService } from './orders.service';


@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}