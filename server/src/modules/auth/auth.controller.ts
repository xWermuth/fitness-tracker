import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/decorators';
import { AuthDto } from 'src/dtos/auth.dto';
import { RtGuard } from 'src/guards';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AUTH_CONSTANTS } from './constants.auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() dto: AuthDto, @Res() res: Response) {
    const tokens = await this.authService.signup(dto);
    res.cookie(AUTH_CONSTANTS.COOKIE_KEY, tokens, { httpOnly: true }).status(HttpStatus.OK).send(tokens);
  }

  @Public()
  @Post('signin')
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    const tokens = await this.authService.signin(dto);
    res.cookie(AUTH_CONSTANTS.COOKIE_KEY, tokens, { httpOnly: true }).status(HttpStatus.OK).send(tokens);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number, @Res() res: Response): Promise<boolean> {
    res.clearCookie(AUTH_CONSTANTS.COOKIE_KEY);
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    res.cookie(AUTH_CONSTANTS.COOKIE_KEY, tokens, { httpOnly: true }).status(HttpStatus.OK).send(tokens);
  }

  @Get('temp')
  temp() {
    return 'hello world';
  }
}
