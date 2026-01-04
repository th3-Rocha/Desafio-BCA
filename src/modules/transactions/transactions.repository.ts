import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Transaction } from './entities/transaction.entity';
import { ITransactionRepository } from './interfaces/transaction-repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly db: DatabaseService) {}

  save(transaction: Transaction): void {
    this.db.addTransaction(transaction);
  }

  deleteAll(): void {
    this.db.clear();
  }
}
