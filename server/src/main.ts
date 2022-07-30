import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get<string>('SERVER_PORT');
  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  await app.listen(port);
  console.log('Server is running on port ' + port);
}
bootstrap();
