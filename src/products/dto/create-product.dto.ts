import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'name', description: 'product name' })
  readonly name: string;
  @ApiProperty({ example: 'description', description: 'product description' })
  readonly description: string;
  @ApiProperty({ example: '999.9', description: 'product price' })
  readonly price: number;
  @ApiProperty({ example: '1000', description: 'product stock_quantity' })
  readonly stock_quantity: number;
}
