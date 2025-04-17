import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager', 'user'])
  @ApiOperation({ summary: 'Creates an order' })
  @ApiResponse({ type: Order })
  @Post('/create')
  create(@Req() req: Request, @Body() dto: CreateOrderDto) {
    return this.orderService.create(req, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Gets an order by given id' })
  @ApiResponse({ type: Order })
  @Get('/get/:id')
  get(@Param('id') id: number) {
    return this.orderService.get(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @ApiOperation({ summary: 'Gets all orders' })
  @ApiResponse({ type: Order })
  @Get('/get/all')
  getAll() {
    return this.orderService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Gets all user's orders " })
  @ApiResponse({ type: Order })
  @Get('/get/all/:userId')
  getAllUsers(@Req() req: Request, @Param('userId') userId: number) {
    return this.orderService.getAllUsers(req, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @ApiOperation({ summary: 'Updates an order with given data' })
  @ApiResponse({ type: Order })
  @Put('/edit/:id')
  edit(@Body() dto: CreateOrderDto, @Param('id') id: number) {
    return this.orderService.edit(dto, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager', 'user'])
  @ApiOperation({ summary: 'Deletes an order with given id' })
  @ApiResponse({ type: Order })
  @Delete('/delete/:id')
  delete(@Req() req: Request, @Param('id') id: number) {
    return this.orderService.delete(req, id);
  }
}
