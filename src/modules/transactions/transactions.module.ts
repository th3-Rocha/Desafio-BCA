import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionRepository } from './transactions.repository';
import { TRANSACTION_REPOSITORY } from './interfaces/transaction-repository.interface';
import { DatabaseModule } from '../database/database.module';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from './use-cases/delete-all-transactions.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionsController],
  providers: [
    CreateTransactionUseCase,
    DeleteAllTransactionsUseCase,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionRepository,
    },
  ],
})
export class TransactionsModule {}
