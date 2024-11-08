import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './external/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
