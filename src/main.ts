import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setServers } from 'dns';

setServers(['8.8.8.8', '1.1.1.1']);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  await app.listen(process.env.PORT ?? 3000);
  app.enableShutdownHooks();
}
bootstrap();
