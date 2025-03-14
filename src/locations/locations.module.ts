import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Location } from './locations.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports: [SequelizeModule.forFeature([Location]), AuthModule],
})
export class LocationsModule {}
