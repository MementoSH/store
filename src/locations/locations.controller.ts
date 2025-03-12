import { Body, Controller, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationsService) {}
  @Post('/create')
  create(@Body() dto: CreateLocationDto) {
    return this.locationService.create(dto);
  }
}
