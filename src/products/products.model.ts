import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Location } from 'src/locations/locations.model';
import { OrderProduct } from 'src/orders/order-products.model';
import { Order } from 'src/orders/order.model';

interface ProductCreationAttrs {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
}

@Table({
  tableName: 'products',
})
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: 'name', description: 'product name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'description',
    description: 'product description',
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @ApiProperty({
    example: 'category',
    description: 'product category',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  category: string;

  @ApiProperty({
    example: 1,
    description: 'location id',
  })
  @ForeignKey(() => Location)
  location_id: number;

  @BelongsTo(() => Location, { foreignKey: 'location_id', as: 'locationId' })
  locationId: Location;

  @ApiProperty({
    example: '999.9',
    description: 'product price',
  })
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  price: number;

  @ApiProperty({
    example: 100,
    description: 'product quantity',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  stock_quantity: number;

  @BelongsToMany(() => Order, () => OrderProduct)
  orders: Order[];
}
