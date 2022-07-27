import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/types/jwt.types';
import { Request } from 'express';
import { AUTH_CONSTANTS } from '../constants.auth';
import { Tokens } from 'src/types/token.types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data:Tokens = request?.cookies[AUTH_CONSTANTS.COOKIE_KEY];
          
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
