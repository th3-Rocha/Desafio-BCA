import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Statistic } from './entities/statistic.entity';
import { STATISTICS_REPOSITORY } from './interfaces/statistics-repository.interface';
import type { IStatisticsRepository } from './interfaces/statistics-repository.interface';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject(STATISTICS_REPOSITORY)
    private readonly statisticsRepository: IStatisticsRepository,
  ) {}

  getStatistics(): Statistic {
    const recentTransactions = this.statisticsRepository.getRecent();
    return this.calculateMetrics(recentTransactions);
  }

  private calculateMetrics(transactions: Transaction[]): Statistic {
    if (transactions.length === 0) {
      return Statistic.createEmpty();
    }

    const values = transactions.map((t) => t.amount);
    const sum = values.reduce((acc, curr) => acc + curr, 0);

    const stats: Statistic = {
      count: transactions.length,
      sum: this.centsToFloat(sum),
      avg: this.centsToFloat(sum / transactions.length),
      min: this.centsToFloat(Math.min(...values)),
      max: this.centsToFloat(Math.max(...values)),
    };

    return stats;
  }

  private centsToFloat(value: number): number {
    return parseFloat((value / 100).toFixed(2));
  }
}
