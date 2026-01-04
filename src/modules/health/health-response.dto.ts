import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({ example: 'ok', description: 'Status da aplicação' })
  status: string;

  @ApiProperty({
    example: '2026-01-03T10:00:00.000Z',
    description: 'Data atual do servidor',
  })
  timestamp: string;

  @ApiProperty({
    example: 120.5,
    description: 'Tempo em segundos que a aplicação está rodando',
  })
  uptime: number;
}
