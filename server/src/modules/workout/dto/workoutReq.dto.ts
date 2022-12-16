import { IsNotEmpty } from 'class-validator';
import { Intensity } from 'src/enums/intensity.enum';

export class WorkoutReqDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  intensity: Intensity;
}
