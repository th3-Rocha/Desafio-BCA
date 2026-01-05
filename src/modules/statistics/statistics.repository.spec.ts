import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsRepository } from './statistics.repository';
import { DATABASE_SERVICE } from '../database/interfaces/database.interface';
import { Transaction } from '../transactions/entities/transaction.entity';

const mockDatabaseService = {
  addTransaction: jest.fn(),
  getRecentTransactions: jest.fn(),
  clear: jest.fn(),
};

describe('StatisticsRepository', () => {
  let repository: StatisticsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsRepository,
        {
          provide: DATABASE_SERVICE,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    repository = module.get<StatisticsRepository>(StatisticsRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getRecent', () => {
    it('should call db.getRecentTransactions and return result', () => {
      const mockTransactions: Transaction[] = [
        { amount: 10000, timestamp: new Date() },
        { amount: 20000, timestamp: new Date() },
      ];
      mockDatabaseService.getRecentTransactions.mockReturnValue(
        mockTransactions,
      );

      const result = repository.getRecent();

      expect(mockDatabaseService.getRecentTransactions).toHaveBeenCalled();
      expect(result).toEqual(mockTransactions);
    });
  });
});
