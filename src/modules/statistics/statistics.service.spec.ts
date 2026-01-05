import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import { STATISTICS_REPOSITORY } from './interfaces/statistics-repository.interface';

const mockStatisticsRepository = {
  getRecent: jest.fn(),
};

describe('StatisticsService', () => {
  let service: StatisticsService;
  let repository: typeof mockStatisticsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: STATISTICS_REPOSITORY,
          useValue: mockStatisticsRepository,
        },
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
    repository = mockStatisticsRepository;

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStatistics', () => {
    it('should return zero values when no transactions are found', () => {
      repository.getRecent.mockReturnValue([]);
      const result = service.getStatistics();
      expect(result).toEqual({
        count: 0,
        sum: 0,
        avg: 0,
        min: 0,
        max: 0,
      });
    });

    it('should calculate statistics correctly for multiple transactions', () => {
      const transactions = [
        { amount: 1000, timestamp: new Date() },
        { amount: 2000, timestamp: new Date() },
      ];
      repository.getRecent.mockReturnValue(transactions);
      const result = service.getStatistics();
      expect(result).toEqual({
        count: 2,
        sum: 30.0,
        avg: 15.0,
        min: 10.0,
        max: 20.0,
      });
    });

    it('should handle decimal values correctly (centsToFloat)', () => {
      const transactions = [{ amount: 1234, timestamp: new Date() }];
      repository.getRecent.mockReturnValue(transactions);
      const result = service.getStatistics();
      expect(result).toEqual({
        count: 1,
        sum: 12.34,
        avg: 12.34,
        min: 12.34,
        max: 12.34,
      });
    });
  });
});
