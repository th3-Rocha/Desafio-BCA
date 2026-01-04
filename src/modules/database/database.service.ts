import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private _transactions: Transaction[] = [];
  private cleanupInterval: NodeJS.Timeout;

  getRecentTransactions(): Transaction[] {
    const threshold = this.getThreshold();
    return this._transactions.filter((t) => t.timestamp.getTime() >= threshold);
  }

  addTransaction(transaction: Transaction) {
    this._transactions.push(transaction);
  }

  clear() {
    this._transactions = [];
  }

  onModuleInit() {
    this.cleanupInterval = setInterval(() => {
      this.removeOldTransactions();
    }, 5000);
  }

  onModuleDestroy() {
    clearInterval(this.cleanupInterval);
  }

  private getThreshold(): number {
    return Date.now() - 60000;
  }

  private removeOldTransactions() {
    if (this._transactions.length === 0) return;
    const threshold = this.getThreshold();
    if (this._transactions[0].timestamp.getTime() >= threshold) return;
    this._transactions = this._transactions.filter(
      (t) => t.timestamp.getTime() >= threshold,
    );
  }
}
