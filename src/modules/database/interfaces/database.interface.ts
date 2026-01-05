import { Transaction } from '../../transactions/entities/transaction.entity';
export const DATABASE_SERVICE = Symbol('IDatabaseService');
export interface IDatabaseService {
  getRecentTransactions(): Transaction[];
  addTransaction(transaction: Transaction): void;
  clear(): void;
}
