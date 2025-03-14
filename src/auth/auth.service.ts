import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto, res: Response) {
    try {
      const user = await this.validateUser(userDto);
      const token = await this.generateToken(user);
      res.cookie('access_token', token, {
        httpOnly: true,
      });

      return { access_token: token };
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(userDto: CreateUserDto, res: Response) {
    try {
      const candidate = await this.userService.getUserByEmail(userDto.email);
      if (candidate) {
        throw new UnauthorizedException('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashedPassword,
      });
      const token = await this.generateToken(user);
      res.cookie('access_token', token, {
        httpOnly: true,
      });
      return { access_token: token };
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async logout(res: Response) {
    try {
      res.clearCookie('access_token');
      return { message: 'Successfull logout' };
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateToken(user: User) {
    try {
      const payload = { sub: user.id, email: user.email, role: user.role };
      return await this.jwtService.signAsync(payload);
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async extractJwtFromCookies(req: Request) {
    try {
      return req.cookies['access_token'];
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(userDto: CreateUserDto) {
    try {
      const user = await this.userService.getUserByEmail(userDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
      throw new UnauthorizedException('Invalid email or password');
    } catch (e) {
      throw new HttpException(
        `Unknown Server Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
