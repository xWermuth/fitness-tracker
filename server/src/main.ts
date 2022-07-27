import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8000;
  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  await app.listen(port);
  console.log('Server is running on port ' + port);
}
bootstrap();
