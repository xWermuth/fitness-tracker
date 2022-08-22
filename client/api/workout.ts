import { WorkoutBodyInterface } from './../config/workout.config';
import api from './api';

type CreateWorkoutRes = boolean;

export async function createWorkout(body: WorkoutBodyInterface) {
  return (await api.post<CreateWorkoutRes>('/workout/', { ...body, duration: parseInt(body.duration) })).data;
}
