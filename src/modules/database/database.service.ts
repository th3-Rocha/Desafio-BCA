import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Transaction } from '../transactions/entities/transaction.entity';
import { IDatabaseService } from './interfaces/database.interface';

@Injectable()
export class DatabaseService
  implements IDatabaseService, OnModuleInit, OnModuleDestroy
{
  private transactions: Transaction[] = [];
  private cleanupInterval: NodeJS.Timeout;

  getRecentTransactions(): Transaction[] {
    const threshold = this.getThreshold();
    return this.transactions.filter((t) => t.timestamp.getTime() >= threshold);
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  clear(): void {
    this.transactions = [];
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

  private removeOldTransactions(): void {
    if (this.transactions.length === 0) return;
    const threshold = this.getThreshold();
    this.transactions = this.transactions.filter(
      (t) => t.timestamp.getTime() >= threshold,
    );
  }
}
