import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import helmet from 'helmet';
import { Statistic } from '../src/modules/statistics/entities/statistic.entity';
import type { Server } from 'http';

interface ErrorResponse {
  message: string | string[];
  error?: string;
  statusCode: number;
}

describe('Transactions & Statistics API (e2e)', () => {
  let app: INestApplication;
  let httpServer: Server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

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

    await app.init();
    httpServer = app.getHttpServer() as Server;
    await request(httpServer).delete('/transactions');
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /transactions', () => {
    it('should create a valid transaction and return 201', async () => {
      const transaction = {
        amount: 123.45,
        timestamp: new Date().toISOString(),
      };

      await request(httpServer)
        .post('/transactions')
        .send(transaction)
        .expect(201);
    });

    it('should accept transaction with amount = 0', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          amount: 0,
          timestamp: new Date().toISOString(),
        })
        .expect(201);
    });

    it('should return 422 when timestamp is in the future', async () => {
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 1);

      const response = await request(httpServer)
        .post('/transactions')
        .send({
          amount: 100,
          timestamp: futureDate.toISOString(),
        })
        .expect(422);

      const body = response.body as ErrorResponse;
      expect(body.message).toBeDefined();
    });

    it('should return 422 when amount is negative', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          amount: -50,
          timestamp: new Date().toISOString(),
        })
        .expect(422);
    });

    it('should return 422 when amount is missing', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          timestamp: new Date().toISOString(),
        })
        .expect(422);
    });

    it('should return 422 when timestamp is missing', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          amount: 100,
        })
        .expect(422);
    });

    it('should return 422 when timestamp format is invalid', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          amount: 100,
          timestamp: 'invalid-date',
        })
        .expect(422);
    });

    it('should return 422 when amount is not a number', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          amount: 'invalid',
          timestamp: new Date().toISOString(),
        })
        .expect(422);
    });

    it('should return 422 when timestamp has timezone offset instead of Z', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          amount: 100,
          timestamp: '2024-02-20T12:34:56.789+03:00',
        })
        .expect(422);
    });

    it('should return 422 when timestamp has no timezone indicator', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          amount: 100,
          timestamp: '2024-02-20T12:34:56.789',
        })
        .expect(422);
    });

    it('should accept timestamp with milliseconds and Z', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          amount: 100,
          timestamp: '2024-02-20T12:34:56.789Z',
        })
        .expect(201);
    });

    it('should accept timestamp without milliseconds but with Z', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({
          amount: 100,
          timestamp: '2024-02-20T12:34:56Z',
        })
        .expect(201);
    });
  });

  describe('DELETE /transactions', () => {
    it('should delete all transactions and return 200', async () => {
      await request(httpServer).post('/transactions').send({
        amount: 100,
        timestamp: new Date().toISOString(),
      });

      await request(httpServer).post('/transactions').send({
        amount: 200,
        timestamp: new Date().toISOString(),
      });

      await request(httpServer).delete('/transactions').expect(200);

      const statsResponse = await request(httpServer)
        .get('/statistics')
        .expect(200);

      const stats = statsResponse.body as Statistic;
      expect(stats.count).toBe(0);
    });

    it('should return 200 even when there are no transactions', async () => {
      await request(httpServer).delete('/transactions').expect(200);
    });
  });

  describe('GET /statistics', () => {
    it('should return all zeros when there are no transactions', async () => {
      const response = await request(httpServer).get('/statistics').expect(200);

      const stats = response.body as Statistic;
      expect(stats).toEqual({
        count: 0,
        sum: 0,
        avg: 0,
        min: 0,
        max: 0,
      });
    });

    it('should return correct statistics for a single transaction', async () => {
      const amount = 100.5;

      await request(httpServer).post('/transactions').send({
        amount,
        timestamp: new Date().toISOString(),
      });

      const response = await request(httpServer).get('/statistics').expect(200);

      const stats = response.body as Statistic;
      expect(stats).toEqual({
        count: 1,
        sum: amount,
        avg: amount,
        min: amount,
        max: amount,
      });
    });

    it('should calculate correct statistics for multiple transactions', async () => {
      const transactions = [
        { amount: 10, timestamp: new Date().toISOString() },
        { amount: 20, timestamp: new Date().toISOString() },
        { amount: 30, timestamp: new Date().toISOString() },
      ];

      for (const transaction of transactions) {
        await request(httpServer).post('/transactions').send(transaction);
      }

      const response = await request(httpServer).get('/statistics').expect(200);

      const stats = response.body as Statistic;
      expect(stats).toEqual({
        count: 3,
        sum: 60,
        avg: 20,
        min: 10,
        max: 30,
      });
    });

    it('should NOT include transactions older than 60 seconds', async () => {
      const oldDate = new Date();
      oldDate.setSeconds(oldDate.getSeconds() - 61);

      await request(httpServer).post('/transactions').send({
        amount: 999,
        timestamp: oldDate.toISOString(),
      });

      await request(httpServer).post('/transactions').send({
        amount: 100,
        timestamp: new Date().toISOString(),
      });

      const response = await request(httpServer).get('/statistics').expect(200);

      const stats = response.body as Statistic;
      expect(stats.count).toBe(1);
      expect(stats.sum).toBe(100);
    });

    it('should find correct min and max values', async () => {
      await request(httpServer)
        .post('/transactions')
        .send({ amount: 100, timestamp: new Date().toISOString() });

      await request(httpServer)
        .post('/transactions')
        .send({ amount: 5, timestamp: new Date().toISOString() });

      await request(httpServer)
        .post('/transactions')
        .send({ amount: 500, timestamp: new Date().toISOString() });

      const response = await request(httpServer).get('/statistics').expect(200);

      const stats = response.body as Statistic;
      expect(stats.min).toBe(5);
      expect(stats.max).toBe(500);
      expect(stats.count).toBe(3);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete flow: create -> check -> delete -> check', async () => {
      let response = await request(httpServer).get('/statistics');
      let stats = response.body as Statistic;
      expect(stats.count).toBe(0);

      await request(httpServer)
        .post('/transactions')
        .send({ amount: 100, timestamp: new Date().toISOString() });

      await request(httpServer)
        .post('/transactions')
        .send({ amount: 200, timestamp: new Date().toISOString() });

      response = await request(httpServer).get('/statistics');
      stats = response.body as Statistic;
      expect(stats.count).toBe(2);
      expect(stats.sum).toBe(300);

      await request(httpServer).delete('/transactions');

      response = await request(httpServer).get('/statistics');
      stats = response.body as Statistic;
      expect(stats.count).toBe(0);
    });
  });
});
