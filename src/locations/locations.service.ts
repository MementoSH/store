import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Location } from './locations.model';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location) private locationRepository: typeof Location,
  ) {}

  async create(dto: CreateLocationDto) {
    try {
      const location = await this.locationRepository.create(dto);
      return location;
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
