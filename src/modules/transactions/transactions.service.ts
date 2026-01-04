import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TRANSACTION_REPOSITORY } from './interfaces/transaction-repository.interface';
import type { ITransactionRepository } from './interfaces/transaction-repository.interface';
@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly repository: ITransactionRepository,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    const amountInCents = Math.round(createTransactionDto.amount * 100); //salva inteiro
    const timestampDate = new Date(createTransactionDto.timestamp);
    const now = new Date();

    if (timestampDate > now) {
      throw new UnprocessableEntityException(
        'A transação NÃO PODE estar no futuro.',
      );
    }

    const transaction: Transaction = {
      amount: amountInCents,
      timestamp: timestampDate,
    };

    this.repository.save(transaction);
    return;
  }

  deleteAll() {
    this.repository.deleteAll();
    return;
  }
}
