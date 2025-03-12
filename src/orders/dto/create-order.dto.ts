import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: [0, 1, 2, 3], description: 'products id' })
  readonly productsId: number[];

  @ApiProperty({ example: 0, description: 'from location id' })
  readonly from_location_id: number;

  @ApiProperty({ example: 0, description: 'to location id' })
  readonly to_location_id: number;
}
