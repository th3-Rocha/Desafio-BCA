import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.useLogger(app.get(Logger));
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Desafio BCA API')
    .setDescription('Desafio: API de transações financeiras')
    .setVersion('1.0')
    .addTag('Health', 'Endpoint de health check')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  await app.listen(port);
}
bootstrap();
