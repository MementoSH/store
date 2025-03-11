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

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'moderator'])
  @Post('/create')
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get/:id')
  get(@Param('id') id: string) {
    return this.productService.get(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'moderator'])
  @Put('/edit/:id')
  edit(@Body() dto: CreateProductDto, @Param('id') id: string) {
    return this.productService.edit(dto, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'moderator'])
  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.productService.delete(Number(id));
  }
}
