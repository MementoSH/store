import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { LocationsType } from './enum/locations-type.enum';
import { Order } from 'src/orders/order.model';

interface LocationCreationAttrs {
  name: string;
  address: string;
  type: LocationsType;
}

@Table({
  tableName: 'locations',
})
export class Location extends Model<Location, LocationCreationAttrs> {
  @ApiProperty({ example: 'name', description: 'location name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'address', description: 'location address' })
  @Column({ type: DataType.TEXT, allowNull: false })
  address: string;

  @ApiProperty({ example: 'store', description: 'location type' })
  @Column({
    type: DataType.ENUM(...Object.values(LocationsType)),
    allowNull: false,
  })
  type: LocationsType;

  @HasMany(() => Order)
  orders: Order[];
}
