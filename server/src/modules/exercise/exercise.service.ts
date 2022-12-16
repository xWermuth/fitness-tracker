import { ExerciseDto } from './exercise.dto';
import { PrismaService } from './../db/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseService {
  constructor(private db: PrismaService) {}

  async create(dto: ExerciseDto) {
    console.log('this.db.exercise.create: ', dto);

    const res = await this.db.exercise.create({ data: dto });
    return true;
  }
}
