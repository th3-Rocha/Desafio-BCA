import { Injectable } from '@nestjs/common';
import { Transaction } from '../transactions/entities/transaction.entity';
import { StatisticsRepository } from './statistics.repository';

@Injectable()
export class StatisticsService {
  constructor(private readonly statisticsRepository: StatisticsRepository) {}

  getStatistics() {
    const recentTransactions = this.statisticsRepository.getRecent();
    return this.calculateMetrics(recentTransactions);
  }

  private calculateMetrics(transactions: Transaction[]) {
    if (transactions.length === 0) {
      return { sum: 0, avg: 0, max: 0, min: 0, count: 0 };
    }
    const count = transactions.length;
    const values = transactions.map((t) => t.amount);

    const sum = values.reduce((acc, curr) => acc + curr, 0);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = sum / count;

    return {
      sum: this.centsToFloat(sum),
      avg: this.centsToFloat(avg),
      max: this.centsToFloat(max),
      min: this.centsToFloat(min),
      count: count,
    };
  }
  private centsToFloat(value: number): number {
    return parseFloat((value / 100).toFixed(2));
  }
}
