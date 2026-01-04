import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository, DatabaseService],
})
export class TransactionsModule {}
