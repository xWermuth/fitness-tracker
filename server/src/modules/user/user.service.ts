import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async findOne(username: string) {
    return this.db.user.findFirstOrThrow({ where: { name: username } });
  }
}
