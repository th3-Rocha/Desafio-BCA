import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { GetStatisticsUseCase } from './use-cases/get-statistics.use-case';
import { Statistic } from './entities/statistic.entity';

describe('StatisticsController', () => {
  let controller: StatisticsController;
  let mockGetStatisticsUseCase: GetStatisticsUseCase;

  const mockGetStatisticsUseCaseProvider = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        {
          provide: GetStatisticsUseCase,
          useValue: mockGetStatisticsUseCaseProvider,
        },
      ],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
    mockGetStatisticsUseCase =
      module.get<GetStatisticsUseCase>(GetStatisticsUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStatistics', () => {
    it('should return statistics from the use case', () => {
      const expectedResult: Statistic = {
        count: 10,
        sum: 100.0,
        avg: 10.0,
        min: 5.0,
        max: 15.0,
      };

      const spy = jest
        .spyOn(mockGetStatisticsUseCase, 'execute')
        .mockReturnValue(expectedResult);

      const result = controller.getStatistics();

      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalled();
    });
  });
});
