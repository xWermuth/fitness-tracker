import { PrismaService } from './../db/prisma.service';
import { Injectable } from '@nestjs/common';
import { WorkoutDto } from './dto/workout.dto';

@Injectable()
export class WorkoutService {
  /**
   *
   */
  constructor(private prisma: PrismaService) {}

  async create(workoutDto: WorkoutDto) {
    return await this.prisma.workout.create({ data: workoutDto });
  }
}
