import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Product } from './products.model';
import { ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @ApiResponse({ type: Product })
  @Post('/create')
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Product })
  @Get('/getby/:id')
  get(@Param('id') id: number) {
    return this.productService.get(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Product })
  @Get('/get/all')
  getAll() {
    return this.productService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Product })
  @Get('/get/:category')
  getCategory(@Param('category') category: string) {
    return this.productService.getCategory(category);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @ApiResponse({ type: Product })
  @Put('/edit/:id')
  edit(@Body() dto: CreateProductDto, @Param('id') id: string) {
    return this.productService.edit(dto, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @ApiResponse({ type: Product })
  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.productService.delete(Number(id));
  }
}
