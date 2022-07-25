import { Role } from 'src/enums/role.enum';

export type JwtPayload = {
  email: string;
  sub: number;
  role: Role;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
