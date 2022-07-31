import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  private isTesting: boolean;

  constructor(private config: ConfigService) {
    const isTesting = config.get('NODE_ENV') === 'test';
    const url = isTesting ? config.get('TEST_DATABASE_URL') : config.get('DATABASE_URL');
    super({ datasources: { db: { url } } });
    this.isTesting = isTesting;
  }

  async onModuleInit() {
    this.logger.log('Prisma service is ready');
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async cleanDatabase() {
    if (!this.isTesting) {
      return;
    }
    await this.user.deleteMany();
  }
}
