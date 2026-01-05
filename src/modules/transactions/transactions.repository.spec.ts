import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepository } from './transactions.repository';
import { DATABASE_SERVICE } from '../database/interfaces/database.interface';
import { Transaction } from './entities/transaction.entity';

const mockDatabaseService = {
  addTransaction: jest.fn(),
  getRecentTransactions: jest.fn(),
  clear: jest.fn(),
};

describe('TransactionRepository', () => {
  let repository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionRepository,
        {
          provide: DATABASE_SERVICE,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    repository = module.get<TransactionRepository>(TransactionRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should call db.addTransaction with transaction', () => {
      const transaction: Transaction = {
        amount: 10000,
        timestamp: new Date(),
      };

      repository.save(transaction);

      expect(mockDatabaseService.addTransaction).toHaveBeenCalledWith(
        transaction,
      );
    });
  });

  describe('deleteAll', () => {
    it('should call db.clear', () => {
      repository.deleteAll();

      expect(mockDatabaseService.clear).toHaveBeenCalled();
    });
  });
});
