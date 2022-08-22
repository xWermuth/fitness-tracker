import { AuthFixture } from './../../auth/tests/auth.fixture';
import { WorkoutFixture } from './../../workout/tests/workout.fixture';
import { ExerciseDto } from '../exercise.dto';
import { ExerciseService } from '../exercise.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from '../../db/prisma.service';
import { WorkoutService } from '../../workout/workout.service';
import { AuthService } from 'src/modules/auth/auth.service';

const exercise: ExerciseDto = {
  name: 'Benchpress',
  reps: 8,
  sets: 4,
  workoutId: 1,
  weight: 75,
};

const USER_NAME = 'myetest';

describe('Auth Flow', () => {
  let prisma: PrismaService;
  let exerciseService: ExerciseService;
  let workoutService: WorkoutService;
  let authService: AuthService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    workoutService = moduleRef.get(WorkoutService);
    exerciseService = moduleRef.get(ExerciseService);
    authService = moduleRef.get(AuthService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('create', () => {
    beforeAll(async () => {
      await prisma.cleanDatabase();
      await authService.signup({ ...AuthFixture, name: USER_NAME, email: 'myeemail@gmail.com' });
      const { id } = await prisma.user.findFirst({ where: { name: USER_NAME } });
      await workoutService.create({ ...WorkoutFixture, userId: id });
    });

    it('should create exercise', async () => {
      const { id } = await prisma.workout.findFirst({ where: { name: WorkoutFixture.name } });
      console.log('workout id: ', id);

      const actual = await exerciseService.create({ ...exercise, workoutId: id });

      expect(actual).toBeTruthy();
    });
  });
});
