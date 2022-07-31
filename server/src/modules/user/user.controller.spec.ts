import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AuthDto } from 'src/dtos/auth.dto';
import { Role } from 'src/enums/role.enum';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../db/prisma.service';
import { UserService } from './user.service';

const user: AuthDto = {
  email: 'test1@gmail.com',
  name: 'test1',
  password: 'super-secret-password',
  confirmPassword: 'super-secret-password',
};

describe('UserController', () => {
  let userService: UserService;
  let prisma: PrismaService;
  let authService: AuthService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);
    authService = moduleRef.get(AuthService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('get user stats', () => {
    beforeEach(async () => {
      await prisma.cleanDatabase();
      await authService.signup(user);
    });

    it('should get users details by username', async () => {
      const { confirmPassword, password, ...rest } = user;
      const expected = { ...rest, role: Role.User };
      const { id, ...actualUser } = await userService.getUserInfo(user.name);
      console.log('id: ', id);
      expect(actualUser).toEqual(expected);
    });
  });
});
