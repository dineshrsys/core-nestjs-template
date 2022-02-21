import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const documents = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Good Action')
      .setDescription('Good Action Api Documentation')
      .setVersion('0.0.1')
      .addBearerAuth()
      .build(),
  );

  return SwaggerModule.setup('/docs', app, documents);
};
