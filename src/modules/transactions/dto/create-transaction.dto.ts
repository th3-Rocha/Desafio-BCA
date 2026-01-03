import { IsISO8601, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @Min(0)
  amount: number;
  @IsISO8601({ strict: true }) //strict obriga tudo
  timestamp: string;
}
