import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Statistic } from './entities/statistic.entity';
import { ApiTags } from '@nestjs/swagger';
import { GetStatisticsUseCase } from './use-cases/get-statistics.use-case';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly getStatisticsUseCase: GetStatisticsUseCase) {}

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
    return this.getStatisticsUseCase.execute();
  }
}
