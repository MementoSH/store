import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLocationDto } from './dto/create-location.dto';
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

  async get(id: number) {
    try {
      const location = await this.locationRepository.findOne({
        where: { id: id },
      });
      return location;
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll() {
    try {
      const locations = await this.locationRepository.findAll();
      return locations;
    } catch (e) {
      throw new HttpException(
        `Uknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(dto: CreateLocationDto) {
    try {
      const location = await this.locationRepository.findOne({
        where: { address: dto.address, name: dto.name, type: dto.type },
      });
      if (!location) {
        throw new HttpException(
          `Location with given data has not been found`,
          HttpStatus.NOT_FOUND,
        );
      }
      location.set({ ...dto });
      location.save();
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    try {
      const location = await this.get(id);

      if (!location) {
        throw new HttpException(
          `Location with given id has not been found`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await location.destroy();
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
