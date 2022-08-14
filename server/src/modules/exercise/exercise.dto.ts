import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ExerciseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  reps: number;

  @IsNotEmpty()
  @IsInt()
  sets: number;

  @IsNotEmpty()
  @IsInt()
  workoutId: number;

  @IsInt()
  weight: number; // Default in kg
}
