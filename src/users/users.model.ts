import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/orders/order.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  role: string;
}

@Table({
  tableName: 'users',
})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 'email@example.com', description: "User's email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: 'password',
    description: "User's password",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: 'admin',
    description: "User's role",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  role: string;

  @HasMany(() => Order)
  orders: Order[];
}
