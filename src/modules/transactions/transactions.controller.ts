import { Controller, Post, Body, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
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
    return this.transactionsService.create(createTransactionDto);
  }
  @ApiOperation({ summary: 'Deleta todas as transações' })
  @Delete()
  deleteAll() {
    return this.transactionsService.deleteAll();
  }
}
