import { ExerciseDto } from './exercise.dto';
import { ExerciseService } from './exercise.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from '../db/prisma.service';

const exercise: ExerciseDto = {
  name: 'Benchpress',
  reps: 8,
  sets: 4,
  workoutId: 1,
  weight: 75,
};

describe('Auth Flow', () => {
  let prisma: PrismaService;
  let exerciseService: ExerciseService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    exerciseService = moduleRef.get(ExerciseService);
  });

  describe('create', () => {
    it('should create exercise', async () => {
      const actual = await exerciseService.createExercise(exercise);

      expect(actual).toBe(1);
    });
  });
});
