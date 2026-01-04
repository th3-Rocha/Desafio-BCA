import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Transaction } from './entities/transaction.entity';
@Injectable()
export class TransactionsRepository {
  constructor(private readonly db: DatabaseService) {}

  save(transaction: Transaction): void {
    this.db.addTransaction(transaction);
  }

  deleteAll(): void {
    this.db.clear();
  }
}
