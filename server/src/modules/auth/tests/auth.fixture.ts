import { AuthDto } from './../../../dtos/auth.dto';
export const AuthFixture: AuthDto = {
  email: 'test@gmail.com',
  name: 'test',
  password: 'super-secret-password',
  confirmPassword: 'super-secret-password',
};
