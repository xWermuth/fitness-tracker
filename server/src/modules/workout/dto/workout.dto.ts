import { IsNotEmpty } from 'class-validator';
import { WorkoutReqDto } from './workoutReq.dto';

export class WorkoutDto extends WorkoutReqDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  completedAt: Date;
}
