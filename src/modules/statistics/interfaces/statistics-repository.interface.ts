import { Transaction } from '../../transactions/entities/transaction.entity';
export const STATISTICS_REPOSITORY = Symbol('IStatisticsRepository');
export interface IStatisticsRepository {
  getRecent(): Transaction[];
}
