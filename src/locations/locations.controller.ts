import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Location } from './locations.model';

@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationsService) {}

  @ApiOperation({ summary: 'Creates a location' })
  @ApiResponse({ type: Location })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @Post('/create')
  create(@Body() dto: CreateLocationDto) {
    return this.locationService.create(dto);
  }

  @ApiOperation({ summary: 'Gets a location info by its id' })
  @ApiResponse({ type: Location })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @Get('/get/:id')
  get(@Param('id') id: number) {
    return this.locationService.get(id);
  }

  @ApiOperation({ summary: 'Returns all location' })
  @ApiResponse({ type: Location })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @Get('/getAll')
  getAll() {
    return this.locationService.getAll();
  }

  @ApiOperation({ summary: 'Edits a location with give info' })
  @ApiResponse({ type: Location })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @Put('/edit')
  edit(@Body() dto: CreateLocationDto) {
    return this.locationService.edit(dto);
  }

  @ApiOperation({ summary: 'Deletes location with given id' })
  @ApiResponse({ type: Location })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'manager'])
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.locationService.delete(id);
  }
}
