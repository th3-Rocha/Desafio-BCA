import { Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsRepository {
  private storage: Transaction[] = []; // banco em memoria

  save(transaction: Transaction): void {
    this.storage.push(transaction);
  }

  findAll(): Transaction[] {
    return this.storage;
  }

  deleteAll(): void {
    this.storage = [];
  }
}
