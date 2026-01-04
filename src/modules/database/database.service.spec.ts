import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { Transaction } from '../transactions/entities/transaction.entity';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    jest.useFakeTimers();
  });

  afterEach(() => {
    service.onModuleDestroy();
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Business Rule: 60 Seconds Window', () => {
    it('should filter out transactions older than 60 seconds', () => {
      const now = new Date('2026-01-01T12:00:00.000Z').getTime();
      jest.setSystemTime(now);

      const t1: Transaction = { amount: 10, timestamp: new Date(now - 30000) };
      const t2: Transaction = { amount: 20, timestamp: new Date(now - 60000) };
      const t3: Transaction = { amount: 30, timestamp: new Date(now - 61000) };

      service.addTransaction(t1);
      service.addTransaction(t2);
      service.addTransaction(t3);

      const result = service.getRecentTransactions();
      expect(result).toContain(t1);
      expect(result).toContain(t2);
      expect(result).not.toContain(t3);
      expect(result.length).toBe(2);
    });
  });

  describe('Garbage Collection (Interval)', () => {
    it('should automatically remove old transactions from memory after 5 seconds', () => {
      service.onModuleInit();

      const now = new Date('2026-01-01T12:00:00.000Z').getTime();
      jest.setSystemTime(now);

      const t1: Transaction = { amount: 100, timestamp: new Date(now) };
      service.addTransaction(t1);

      expect(service.getRecentTransactions()).toHaveLength(1);

      jest.advanceTimersByTime(61000);

      jest.advanceTimersByTime(5000);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const memoryStorage = (service as any)._transactions as Transaction[];

      expect(memoryStorage.length).toBe(0);
    });
  });
});
