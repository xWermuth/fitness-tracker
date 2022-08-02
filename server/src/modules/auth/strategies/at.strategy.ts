import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/types/jwt.types';
import { Tokens } from 'src/types/token.types';
import { AUTH_CONSTANTS } from '../constants.auth';
import { Request } from 'express';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data: Tokens = request?.cookies[AUTH_CONSTANTS.AUTH_COOKIE];

          if (!data) {
            return null;
          }

          return data.access_token;
        },
      ]),
      secretOrKey: config.get<string>('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
