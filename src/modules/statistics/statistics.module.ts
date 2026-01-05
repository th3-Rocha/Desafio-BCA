import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsRepository } from './statistics.repository';
import { STATISTICS_REPOSITORY } from './interfaces/statistics-repository.interface';
import { DatabaseModule } from '../database/database.module';
import { GetStatisticsUseCase } from './use-cases/get-statistics.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [StatisticsController],
  providers: [
    GetStatisticsUseCase,
    {
      provide: STATISTICS_REPOSITORY,
      useClass: StatisticsRepository,
    },
  ],
})
export class StatisticsModule {}
