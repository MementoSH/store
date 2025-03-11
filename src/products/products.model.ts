import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
    example: '999.9',
    description: 'product price',
  })
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  price: number;

  @ApiProperty({
    example: '100',
    description: 'product quantity',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  stock_quantity: number;
}
