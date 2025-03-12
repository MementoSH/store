import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async create(dto: CreateProductDto) {
    try {
      return await this.productRepository.create(dto);
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get(id: number) {
    try {
      return await this.productRepository.findByPk(id);
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll() {
    try {
      return await this.productRepository.findAll();
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCategory(category: string) {
    try {
      return await this.productRepository.findAll({
        where: {
          category: category,
        },
      });
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(dto: CreateProductDto, id: number) {
    try {
      const product = await this.get(id);
      if (!product) {
        throw new HttpException('product not found', HttpStatus.NOT_FOUND);
      }
      product.set({ ...dto });
      await product.save();
      return product;
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: number) {
    try {
      const product = await this.get(id);
      if (!product) {
        throw new HttpException('product not found', HttpStatus.NOT_FOUND);
      }
      await product.destroy();
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
