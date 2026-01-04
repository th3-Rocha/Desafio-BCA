import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class StatisticsRepository {
  constructor(private readonly db: DatabaseService) {}

  getAll(): Transaction[] {
    return this.db.transactions;
  }

  // deleteOlders(): void {
  //   this.db.clear();
  // }
}
