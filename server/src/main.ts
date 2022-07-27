import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  console.log('Server is running on port ' + port);
  app.use(cookieParser())
  await app.listen(port);
}
bootstrap();
