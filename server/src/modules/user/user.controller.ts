import { UserService } from './user.service';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GetCurrentUserId } from 'src/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getUser(@GetCurrentUserId() userId: number) {
    return await this.userService.getUserInfoById(userId);
  }
}
