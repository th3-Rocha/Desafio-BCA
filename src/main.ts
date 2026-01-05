import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Desafio BCA API')
    .setDescription('Desafio: API de transações financeiras')
    .setVersion('1.0')
    .addTag('Health', 'Endpoint de health-check')
    .addTag('Transactions', 'Endpoint das transações')
    .addTag('Statistics', 'Endpoint das estatísticas')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  await app.listen(port);
}
bootstrap().catch((err) => {
  console.error('Fatal error during application bootstrap:', err);
  process.exit(1);
});
