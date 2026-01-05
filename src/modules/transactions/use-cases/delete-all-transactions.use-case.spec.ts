import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAllTransactionsUseCase } from './delete-all-transactions.use-case';
import { TRANSACTION_REPOSITORY } from '../interfaces/transaction-repository.interface';

describe('DeleteAllTransactionsUseCase', () => {
  let useCase: DeleteAllTransactionsUseCase;

  const mockTransactionRepository = {
    deleteAll: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteAllTransactionsUseCase,
        {
          provide: TRANSACTION_REPOSITORY,
          useValue: mockTransactionRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteAllTransactionsUseCase>(
      DeleteAllTransactionsUseCase,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.deleteAll', () => {
    useCase.execute();
    expect(mockTransactionRepository.deleteAll).toHaveBeenCalled();
  });
});
