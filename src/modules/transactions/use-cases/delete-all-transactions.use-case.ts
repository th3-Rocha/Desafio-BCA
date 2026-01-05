import { Inject, Injectable } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from '../interfaces/transaction-repository.interface';
import type { ITransactionRepository } from '../interfaces/transaction-repository.interface';

@Injectable()
export class DeleteAllTransactionsUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly repository: ITransactionRepository,
  ) {}

  execute(): void {
    this.repository.deleteAll();
  }
}
