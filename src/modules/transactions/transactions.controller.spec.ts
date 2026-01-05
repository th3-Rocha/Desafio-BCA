import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from './use-cases/delete-all-transactions.use-case';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  const mockCreateTransactionUseCase = {
    execute: jest.fn(),
  };

  const mockDeleteAllTransactionsUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: CreateTransactionUseCase,
          useValue: mockCreateTransactionUseCase,
        },
        {
          provide: DeleteAllTransactionsUseCase,
          useValue: mockDeleteAllTransactionsUseCase,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreateTransactionUseCase with correct values', () => {
      const dto: CreateTransactionDto = {
        amount: 100.5,
        timestamp: '2026-01-03T22:00:00.000Z',
      };

      controller.create(dto);

      expect(mockCreateTransactionUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('deleteAll', () => {
    it('should call DeleteAllTransactionsUseCase', () => {
      controller.deleteAll();
      expect(mockDeleteAllTransactionsUseCase.execute).toHaveBeenCalled();
    });
  });
});
