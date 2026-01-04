import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    example: 100.5,
    description: 'Valor da transação',
  })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: '2026-01-25T12:00:00Z',
    description: 'Timestamp da transação',
  })
  @IsISO8601({ strict: true }) //strict obriga tudo
  timestamp: string;
}
