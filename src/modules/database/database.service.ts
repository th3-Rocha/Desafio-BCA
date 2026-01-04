import { Injectable } from '@nestjs/common';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class DatabaseService {
  private _transactions: Transaction[] = [];

  get transactions(): Transaction[] {
    return this._transactions;
  }

  addTransaction(transaction: Transaction) {
    this._transactions.push(transaction);
  }

  clear() {
    this._transactions = [];
  }
}
