import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  const mockTransactionsService = {
    create: jest.fn(),
    deleteAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: mockTransactionsService,
        },
      ],
    }).compile();
    controller = module.get<TransactionsController>(TransactionsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should call service.create with correct values', () => {
    const dto: CreateTransactionDto = {
      amount: 100.5,
      timestamp: '2026-01-03T22:00:00.000Z',
    };
    controller.create(dto);
    expect(mockTransactionsService.create).toHaveBeenCalledWith(dto);
  });
});
