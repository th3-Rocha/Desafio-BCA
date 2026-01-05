// src/modules/transactions/transactions.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { ITransactionRepository } from './interfaces/transaction-repository.interface';
import { DATABASE_SERVICE } from '../database/interfaces/database.interface';
import type { IDatabaseService } from '../database/interfaces/database.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @Inject(DATABASE_SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  save(transaction: Transaction): void {
    this.db.addTransaction(transaction);
  }

  deleteAll(): void {
    this.db.clear();
  }
}
