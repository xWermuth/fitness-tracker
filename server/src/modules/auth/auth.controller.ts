import { ConfigService } from '@nestjs/config';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/decorators';
import { AuthDto } from 'src/dtos/auth.dto';
import { RtGuard } from 'src/guards';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AUTH_CONSTANTS } from './constants.auth';
import { Tokens } from 'src/types/token.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() dto: AuthDto) {
    await this.authService.signup(dto);
    return true;
  }

  @Public()
  @Post('signin')
  async signin(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { user, tokens } = await this.authService.signin(dto);
    this.setCookie(res, tokens).status(HttpStatus.OK).send(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number, @Res() res: Response): Promise<boolean> {
    res.clearCookie(AUTH_CONSTANTS.AUTH_COOKIE);
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    this.setCookie(res, tokens).status(HttpStatus.OK).send(tokens);
  }

  private setCookie(response: Response, tokens: Tokens) {
    return response.clearCookie(AUTH_CONSTANTS.AUTH_COOKIE).cookie(AUTH_CONSTANTS.AUTH_COOKIE, tokens, this.getCookieOptions());
  }

  private getCookieOptions() {
    return {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') !== 'development',
      sameSite: true,
      maxAge: 60 * 24 * 60 * 10 * 1000, // 10 days expiration
    };
  }

  @Get('temp')
  temp() {
    return 'hello world';
  }
}
