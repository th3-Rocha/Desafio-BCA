// src/modules/statistics/statistics.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from '../transactions/entities/transaction.entity';
import { IStatisticsRepository } from './interfaces/statistics-repository.interface';
import { DATABASE_SERVICE } from '../database/interfaces/database.interface';
import type { IDatabaseService } from '../database/interfaces/database.interface';

@Injectable()
export class StatisticsRepository implements IStatisticsRepository {
  constructor(
    @Inject(DATABASE_SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  getRecent(): Transaction[] {
    return this.db.getRecentTransactions();
  }
}
