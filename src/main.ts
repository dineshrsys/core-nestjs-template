// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import AppModule from './modules/app.module';
import { setupSwagger } from '@common/configs/swagger';
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import { TimeoutInterceptor } from '@common/interceptors/timeout.interceptor';
import { TransformationInterceptor } from '@common/interceptors/transformation.interceptor';
import { HttpExceptionFilter } from '@filters/http-exception.filter';


async function bootstrap() {
    const port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000;
    const app = await NestFactory.create(AppModule, { logger: ['error', 'debug', 'log'] });


    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            'script-src': ['\'self\''],
            upgradeInsecureRequests: null,
        },
    }));
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.useGlobalInterceptors(new TimeoutInterceptor(), new TransformationInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter());

    setupSwagger(app);
    await app.listen(port, async () => Logger.debug(`Server Running on ${port}: ${await app.getUrl()}`));
}

bootstrap()
    .then(() => Logger.log('Application Started'));
