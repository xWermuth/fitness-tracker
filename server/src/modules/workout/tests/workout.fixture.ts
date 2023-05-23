import { Intensity } from './../../../enums/intensity.enum';
import { WorkoutDto } from '../dto/workout.dto';

export const WorkoutFixture: WorkoutDto = {
  name: 'Push w. upper chest focus',
  duration: 80,
  intensity: Intensity.High,
  userId: 1,
  completedAt: new Date(),
};
