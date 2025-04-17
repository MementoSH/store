import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: JwtStrategy.extractJwtFromCookies,
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY || 'secret key',
    });
  }

  static extractJwtFromCookies(req: Request): string | null {
    if (req && req.cookies) {
      return req.cookies['access_token'] || null;
    }
    return null;
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
