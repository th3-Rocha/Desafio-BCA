import { Controller, Get, HttpCode } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Statistic } from './entities/statistic.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @HttpCode(200)
  @ApiOperation({
    summary:
      'retorna estatísticas das transações que ocorreram nos últimos 60 segundos.',
  })
  @Get()
  @ApiOkResponse({
    description: 'Estatísticas dos últimos 60 segundos',
    type: Statistic,
  })
  getStatistics(): Statistic {
    return this.statisticsService.getStatistics();
  }
}
