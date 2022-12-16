import { WorkoutService } from './workout.service';
import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';

@Module({ imports: [], controllers: [WorkoutController], providers: [WorkoutService] })
export class WorkoutModule {}
