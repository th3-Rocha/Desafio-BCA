import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionUseCase } from './create-transaction.use-case';
import { TRANSACTION_REPOSITORY } from '../interfaces/transaction-repository.interface';
import { UnprocessableEntityException } from '@nestjs/common';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;

  const mockTransactionRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionUseCase,
        {
          provide: TRANSACTION_REPOSITORY,
          useValue: mockTransactionRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateTransactionUseCase>(CreateTransactionUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a transaction with correct amount in cents', () => {
    const dto = {
      amount: 12.5,
      timestamp: new Date().toISOString(),
    };

    useCase.execute(dto);

    expect(mockTransactionRepository.save).toHaveBeenCalledWith({
      amount: 1250,
      timestamp: expect.any(Date) as unknown as Date,
    });
  });

  it('should throw UnprocessableEntityException if date is in the future', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    const dto = {
      amount: 10,
      timestamp: futureDate.toISOString(),
    };

    expect(() => useCase.execute(dto)).toThrow(UnprocessableEntityException);
    expect(mockTransactionRepository.save).not.toHaveBeenCalled();
  });
});
