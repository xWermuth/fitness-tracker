import { Intensity } from '../interfaces/intensity.enum';

const workoutNameLabel = 'name';
const durationLabel = 'duration';
export const intensityLabel = 'intensity';

export interface WorkoutBodyInterface {
  [workoutNameLabel]: string;
  [durationLabel]: number;
  [intensityLabel]: Intensity;
}

export const WorkoutFields = [
  {
    labelText: 'Workout name',
    labelFor: workoutNameLabel,
    id: workoutNameLabel,
    name: workoutNameLabel,
    type: 'text',
    isRequired: true,
    placeholder: 'Name of the workout',
  },
  {
    labelText: 'Workout duration',
    labelFor: durationLabel,
    id: durationLabel,
    name: durationLabel,
    type: 'number',
    isRequired: true,
    placeholder: 'Estimated duration of workout',
  },
];
