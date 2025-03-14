import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Location } from 'src/locations/locations.model';
import { Product } from 'src/products/products.model';
import { User } from 'src/users/users.model';
import { OrderProduct } from './order-products.model';

interface OrderCreationAttrs {
  userId: number;
  from_location_id: number;
  to_location_id: number;
}

@Table({
  tableName: 'orders',
})
export class Order extends Model<Order, OrderCreationAttrs> {
  @ApiProperty({ example: 0, description: 'user id' })
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ApiProperty({ example: 0, description: 'from location id' })
  @ForeignKey(() => Location)
  @Column
  from_location_id: number;

  @BelongsTo(() => Location, {
    foreignKey: 'from_location_id',
    as: 'fromLocation',
  })
  fromLocation: Location;

  @ApiProperty({ example: 0, description: 'to location id' })
  @ForeignKey(() => Location)
  @Column
  to_location_id: number;

  @BelongsTo(() => Location, { foreignKey: 'to_location_id', as: 'toLocation' })
  toLocation: Location;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Product, () => OrderProduct)
  product: Product[];
}
