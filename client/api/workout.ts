import { Workout } from '../interfaces/workout.interface';
import { WorkoutBodyInterface } from './../config/workout.config';
import api from './api';

type CreateWorkoutRes = boolean;

export async function createWorkout(body: WorkoutBodyInterface) {
  return (
    await api.post<CreateWorkoutRes>('/workout/', {
      ...body,
      duration: typeof body.duration === 'string' ? parseInt(body.duration) : body.duration,
    })
  ).data;
}

export async function getWorkout() {
  return (await api.get<Workout[]>('/workout/')).data;
}
