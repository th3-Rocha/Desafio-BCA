import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, Min, Matches } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    example: 100.5,
    description: 'Valor da transação',
  })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: '2026-01-01T12:34:56.789Z',
    description: 'Data e hora da transação no formato ISO 8601 (UTC)',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, {
    message:
      'timestamp deve estar no formato ISO 8601 UTC (deve terminar com Z)',
  })
  @IsISO8601({ strict: true })
  timestamp: string;
}
