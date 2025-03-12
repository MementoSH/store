import { ApiProperty } from '@nestjs/swagger';
import { LocationsType } from '../enum/locations-type.enum';

export class CreateLocationDto {
  @ApiProperty({ example: 'name', description: 'location description' })
  readonly name: string;
  @ApiProperty({ example: 'address', description: 'location address' })
  readonly address: string;
  @ApiProperty({ example: 'store', description: 'location type' })
  readonly type: LocationsType;
}
