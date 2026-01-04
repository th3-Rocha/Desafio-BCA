import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    const amountInCents = Math.round(createTransactionDto.amount * 100);
    const timestampDate = new Date(createTransactionDto.timestamp);

    if (timestampDate > new Date()) {
      throw new UnprocessableEntityException(
        'A transação NÃO PODE estar no futuro.',
      );
    }

    const transaction: Transaction = {
      amount: amountInCents,
      timestamp: timestampDate,
    };

    this.transactionsRepository.save(transaction);
    return;
  }

  deleteAll() {
    this.transactionsRepository.deleteAll();
    return;
  }
}
