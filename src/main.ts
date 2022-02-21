// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';

import AppModule from '@modules/app.module';
import { setupSwagger } from '@shared/swagger';
import ExceptionsFilter from '@filters/exceptions.filter';
import { TimeoutInterceptor } from '@interceptors/timeout.interceptor';
import { TransformationInterceptor } from '@interceptors/transformation.interceptor';

async function bootstrap() {
  const port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000;
  const app = await NestFactory.create(AppModule, { logger: ['error', 'debug', 'log'] });

  app.use(helmet());
  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );
  app.useGlobalInterceptors(new TimeoutInterceptor(), new TransformationInterceptor());
  app.useGlobalFilters(new ExceptionsFilter());

  setupSwagger(app);

  await app.listen(port, async () => Logger.log(`Server Running on ${port}: ${await app.getUrl()}`));
}

bootstrap().then(() => Logger.log('Application Started'));
