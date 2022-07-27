import { AUTH_CONSTANTS } from './../constants.auth';
import { Tokens } from 'src/types/token.types';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtPayloadWithRt } from 'src/types/jwt.types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request:Request) => {
        const data:Tokens = request?.cookies[AUTH_CONSTANTS.COOKIE_KEY];
        if(!data){
            return null;
        }
        return data.refresh_token;
    }]),
      secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const tokens:Tokens | undefined = req?.cookies[AUTH_CONSTANTS.COOKIE_KEY]

    if (!tokens?.refresh_token) {
      throw new ForbiddenException('Refresh token malformed');
    }

    return {
      ...payload,
      refreshToken: tokens.refresh_token,
    };
  }
}
