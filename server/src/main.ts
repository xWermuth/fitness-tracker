import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log(':', process.env.CLIENT_URL);
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL,
    },
  });
  const configService = app.get(ConfigService);
  const port = +configService.get<string>('SERVER_PORT');
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  await app.listen(port);
  console.log('Server is running on port ' + port);
}
bootstrap();
