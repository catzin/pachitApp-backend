import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger,ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule); 
  app.useStaticAssets(join(__dirname, '..', 'public')); 
  const logger = new Logger('bootstrap'); // Create a logger instance with a context

  app.setGlobalPrefix('pachitaV1');
  

  logger.debug('Starting application...'); // Log a debug message

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3001);
  logger.log(`Server is running in ${await app.getUrl()}`);

}
bootstrap();
