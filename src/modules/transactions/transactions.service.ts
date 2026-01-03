import { Injectable } from '@nestjs/common';
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
    const transaction: Transaction = {
      amount: amountInCents,
      timestamp: new Date(createTransactionDto.timestamp),
    };

    this.transactionsRepository.save(transaction);
    return;
  }

  deleteAll() {
    this.transactionsRepository.deleteAll();
    return;
  }
}
