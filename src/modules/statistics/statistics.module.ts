import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { StatisticsRepository } from './statistics.repository';
import { STATISTICS_REPOSITORY } from './interfaces/statistics-repository.interface';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StatisticsController],
  providers: [
    StatisticsService,
    {
      provide: STATISTICS_REPOSITORY,
      useClass: StatisticsRepository,
    },
  ],
})
export class StatisticsModule {}
