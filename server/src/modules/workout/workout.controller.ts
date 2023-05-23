import { WorkoutReqDto } from './dto/workoutReq.dto';
import { WorkoutService } from './workout.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetCurrentUserId } from 'src/decorators';

@Controller('workout')
export class WorkoutController {
  /**
   *
   */
  constructor(private workoutService: WorkoutService) {}

  @Post()
  public async create(@GetCurrentUserId() userId: number, @Body() workoutDto: WorkoutReqDto) {
    return await this.workoutService.create({ ...workoutDto, userId, completedAt: new Date() });
  }

  @Get()
  public async get(@GetCurrentUserId() userId: number) {
    return await this.workoutService.getAll(userId);
  }
}
