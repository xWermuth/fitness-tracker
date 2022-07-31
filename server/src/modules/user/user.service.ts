import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async getUserInfo(username: string) {
    const { hash, hashedRt, ...user } = await this.findOne(username);
    return user;
  }

  async getUserInfoById(id: number) {
    const { hash, hashedRt, ...user } = await this.db.user.findFirstOrThrow({ where: { id } });
    return user;
  }

  async findOne(username: string) {
    return this.db.user.findFirstOrThrow({ where: { name: username } });
  }
}
