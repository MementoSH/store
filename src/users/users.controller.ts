import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Gets all users' })
  @ApiResponse({ status: 200, type: User })
  @Get('/getUsers')
  async getUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }
}
