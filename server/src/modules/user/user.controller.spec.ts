import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserService } from './user.service';

describe('UserController', () => {
  let userService: UserService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleRef.get(UserService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should get users details', () => {});
});
