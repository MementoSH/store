import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { Order } from './order.model';

interface CreationOrderProductAttrs {
  orderId: number;
  productId: number;
}

@Table({
  tableName: 'order_products',
})
export class OrderProduct extends Model<
  OrderProduct,
  CreationOrderProductAttrs
> {
  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;
}
