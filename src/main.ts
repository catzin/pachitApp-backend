import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger,ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap'); // Create a logger instance with a context

  app.setGlobalPrefix('pachitaV1');

  logger.debug('Starting application...'); // Log a debug message




  //
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3001);
  logger.log(`Server is running in ${await app.getUrl()}`);

}
bootstrap();
