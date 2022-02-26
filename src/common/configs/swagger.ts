import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import basicAuth from 'express-basic-auth';
import { JWT_BEARER } from '@constants/common.constants';


export const setupSwagger = (app: INestApplication) => {
    const documents = SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
            .setTitle('Good Action')
            .setDescription('API Documentation')
            .setVersion('1.0.0')
            .addServer(<string>process.env.SWAGGER_HOST)
            .addBearerAuth(
                {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: JWT_BEARER,
                },
                JWT_BEARER,
            )
            .build(),
    );

    app.use('/swagger', basicAuth({
        challenge: true,
        users: { [<string>process.env.SWAGGER_USER]: <string>process.env.SWAGGER_PASS },
    }));
    return SwaggerModule.setup('/swagger', app, documents);
};
