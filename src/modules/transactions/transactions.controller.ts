import { Controller, Post, Body, Delete } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from './use-cases/delete-all-transactions.use-case';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase,
  ) {}
  @ApiOperation({ summary: 'Cria uma nova transação' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity',
  })
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(createTransactionDto);
  }
  @ApiResponse({
    status: 200,
    description: 'Delete all transactions',
  })
  @ApiOperation({ summary: 'Deleta todas as transações' })
  @Delete()
  deleteAll() {
    return this.deleteAllTransactionsUseCase.execute();
  }
}
