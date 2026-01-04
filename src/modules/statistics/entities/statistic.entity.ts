import { ApiProperty } from '@nestjs/swagger';

export class Statistic {
  @ApiProperty({
    description: 'Quantidade total de transações',
    example: 10,
  })
  count: number;

  @ApiProperty({
    description: 'Soma total das transações nos últimos 60s',
    example: 1000.5,
  })
  sum: number;

  @ApiProperty({
    description: 'Média dos valores',
    example: 100.5,
  })
  avg: number;
  @ApiProperty({
    description: 'Menor valor encontrado',
    example: 50.0,
  })
  min: number;
  @ApiProperty({
    description: 'Maior valor encontrado',
    example: 200.0,
  })
  max: number;

  static createEmpty(): Statistic {
    return {
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    };
  }
}
