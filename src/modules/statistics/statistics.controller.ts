import { Controller, Get, HttpCode } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @HttpCode(200)
  @ApiOperation({
    summary:
      'retorna estatísticas das transações que ocorreram nos últimos 60 segundos.',
  })
  @Get()
  calcStats() {
    return this.statisticsService.getStatistics();
  }
}
