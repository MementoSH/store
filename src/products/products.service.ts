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
    return await this.productRepository.create(dto);
  }

  async get(id: number) {
    return await this.productRepository.findByPk(id);
  }

  async getAll() {
    return await this.productRepository.findAll();
  }

  async getCategory(category: string) {
    return await this.productRepository.findAll({
      where: {
        category: category,
      },
    });
  }

  async edit(dto: CreateProductDto, id: string) {
    const product = await this.get(Number(id));
    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    product.set({ ...dto });
    await product.save();
    return product;
  }
  async delete(id: number) {
    const product = await this.get(id);
    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    await product.destroy();
  }
}
