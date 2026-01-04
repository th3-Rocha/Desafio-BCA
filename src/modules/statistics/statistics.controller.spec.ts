import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Statistic } from './entities/statistic.entity';

describe('StatisticsController', () => {
  let controller: StatisticsController;
  let service: StatisticsService;
  const mockStatisticsService = {
    getStatistics: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        {
          provide: StatisticsService,
          useValue: mockStatisticsService,
        },
      ],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getStatistics', () => {
    it('should return statistics from the service', () => {
      const expectedResult: Statistic = {
        count: 10,
        sum: 100.0,
        avg: 10.0,
        min: 5.0,
        max: 15.0,
      };
      const spy = jest
        .spyOn(service, 'getStatistics')
        .mockReturnValue(expectedResult);
      const result = controller.getStatistics();
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalled();
    });
  });
});
