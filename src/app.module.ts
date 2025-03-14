import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { LocationsModule } from './locations/locations.module';
import { User } from './users/users.model';
import { Order } from './orders/order.model';
import { Product } from './products/products.model';
import { Location } from './locations/locations.model';
import { OrderProduct } from './orders/order-products.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Order, Product, Location, OrderProduct],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    LocationsModule,
  ],
})
export class AppModule {}
