import { Transaction } from '../entities/transaction.entity';
export const TRANSACTION_REPOSITORY = Symbol('ITransactionRepository');
export interface ITransactionRepository {
  save(transaction: Transaction): void;
  deleteAll(): void;
}
