import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
import { OrderProduct } from './order-products.model';
import { Product } from 'src/products/products.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(OrderProduct)
    private orderProductRepository: typeof OrderProduct,
    @InjectModel(Product) private productRepository: typeof Product,
    private jwtService: JwtService,
  ) {}

  async create(req: Request, dto: CreateOrderDto) {
    try {
      const payload = await this.jwtService.verifyAsync(
        req.cookies['access_token'],
      );

      const order = await this.orderRepository.create({
        to_location_id: dto.to_location_id,
        from_location_id: dto.from_location_id,
        userId: payload.sub,
      });

      for (let productId of dto.productsId) {
        await this.orderProductRepository.create({
          productId: Number(productId),
          orderId: order.id,
        });
        const product = await this.productRepository.findByPk(
          Number(productId),
          { raw: false },
        );
        if (!product) {
          throw new HttpException(
            `Product ${productId} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        console.log(product);
        await this.productRepository.update(
          { stock_quantity: product.get('stock_quantity') - 1 },
          { where: { id: product.id } },
        );
      }

      return await this.orderRepository.findAll({
        where: { id: order.id },
        include: { all: true },
      });
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get(id: number) {
    try {
      const order = await this.orderRepository.findByPk(id);
      return order;
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll() {
    try {
      const orders = await this.orderRepository.findAll();
      return orders;
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUsers(req: Request, userId: number) {
    try {
      const payload = await this.jwtService.verifyAsync(
        req.cookies['access_token'],
      );
      if (
        Number(payload.sub) === Number(userId) ||
        payload.role === 'admin' ||
        payload.role === 'manager'
      ) {
        const orders = await this.orderRepository.findAll({
          where: { userId: userId },
        });

        return orders;
      }

      throw new HttpException(
        'Tries to get someones orders',
        HttpStatus.FORBIDDEN,
      );
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(dto: CreateOrderDto, id: number) {
    try {
      const order = await this.get(id);
      if (!order) {
        throw new HttpException(
          'Order with such id has not been found',
          HttpStatus.NOT_FOUND,
        );
      }

      order.set({ ...dto });
      order.save();

      return order;
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(req: Request, id: number) {
    try {
      const order = await this.get(id);

      if (!order) {
        throw new HttpException(
          'Order with such id has not been found',
          HttpStatus.NOT_FOUND,
        );
      }
      const plainOrder = order.get({ plain: true });

      const payload = await this.jwtService.verifyAsync(
        req.cookies['access_token'],
      );
      if (plainOrder.userId !== payload.sub) {
        throw new HttpException(
          'Tries to delete someones order',
          HttpStatus.FORBIDDEN,
        );
      }
      await order.destroy();
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
