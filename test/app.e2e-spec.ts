import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { HealthResponseDto } from './../src/infrastructure/http/dtos/health-response.dto';
describe('HealthCheck (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health (GET)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res: request.Response) => {
        const body = res.body as HealthResponseDto;
        if (body.status !== 'ok') throw new Error('Status incorreto');
        if (!body.timestamp) throw new Error('Timestamp ausente');
        if (typeof body.uptime !== 'number') throw new Error('Uptime inválido');
      });
  });
});
