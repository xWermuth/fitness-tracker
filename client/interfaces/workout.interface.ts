import { Intensity } from './../../server/src/enums/intensity.enum';
export interface Workout {
  id: number;
  name: string;
  duration: number;
  intensity: Intensity;
  userId: number;
}
