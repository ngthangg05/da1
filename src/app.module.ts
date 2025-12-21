import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Goods, Fav, Cart, Orders],
        synchronize: false,
      }),
    }),
    UserModule,
    GoodsModule,
    FavModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
