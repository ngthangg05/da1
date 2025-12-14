import { Module } from '@nestjs/common';
import { Cart } from './cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { GoodsModule } from 'src/goods/goods.module';
import { OrderModule } from 'src/order/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), GoodsModule, OrderModule],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService],
})
export class CartModule {}
