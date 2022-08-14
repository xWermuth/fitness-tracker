import { ExerciseDto } from './exercise.dto';
import { PrismaService } from './../db/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseService {
  constructor(private db: PrismaService) {}

  async createExercise(dto: ExerciseDto) {
    console.log('this.db.exercise.create: ', this.db.exercise.create);

    const res = await this.db.exercise.create({ data: dto });
    return res.id;
  }
}
