import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AtGuard } from './guards';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './modules/db/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `./.env.${process.env.NODE_ENV}` }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
