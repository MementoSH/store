import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Gets all users' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Get('/getUsers')
  async getUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }
}
