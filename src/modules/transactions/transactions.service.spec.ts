import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { TRANSACTION_REPOSITORY } from './interfaces/transaction-repository.interface';
import { UnprocessableEntityException } from '@nestjs/common';

describe('TransactionsService', () => {
  let service: TransactionsService;
  const mockRepository = {
    save: jest.fn(),
    deleteAll: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: TRANSACTION_REPOSITORY, // ← Usa o token
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction with correct amount in cents', () => {
    const dto = {
      amount: 12.5,
      timestamp: new Date().toISOString(),
    };
    service.create(dto);
    expect(mockRepository.save).toHaveBeenCalledWith({
      amount: 1250,
      timestamp: expect.any(Date) as unknown as Date, // tira erro de eslit
    });
  });

  it('should throw UnprocessableEntityException if date is in the future', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    const dto = {
      amount: 10,
      timestamp: futureDate.toISOString(),
    };

    expect(() => service.create(dto)).toThrow(UnprocessableEntityException);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should call repository.deleteAll', () => {
    service.deleteAll();
    expect(mockRepository.deleteAll).toHaveBeenCalled();
  });
});
