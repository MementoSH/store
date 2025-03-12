import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create({ ...dto, role: 'user' });
      return user.get({ plain: true });
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      return user ? user.get({ plain: true }) : null;
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
