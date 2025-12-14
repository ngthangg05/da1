import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './customer/customer.entity';
import { GoodsModule } from './goods/goods.module';
import { Goods } from './goods/goods.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Fav } from './favorite_goods/fav.entity';
import { FavModule } from './favorite_goods/fav.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';
import { Orders } from './order/orders.entity';
import { OrderModule } from './order/orders.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'master',
      entities: [Customers, Goods, Fav, Cart, Orders],
      synchronize: false,
    }),
    CustomerModule,
    GoodsModule,
    FavModule,
    CartModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
