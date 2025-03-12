import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [SequelizeModule.forFeature([Product]), AuthModule],
  exports: [SequelizeModule],
})
export class ProductsModule {}
