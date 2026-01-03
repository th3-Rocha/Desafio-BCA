import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthResponseDto } from './health-response.dto';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "ok" with timestamp and uptime', () => {
    const result: HealthResponseDto = controller.checkHealth();
    expect(result.status).toBe('ok');
    expect(typeof result.timestamp).toBe('string');
    expect(typeof result.uptime).toBe('number');
    expect(Date.parse(result.timestamp)).not.toBeNaN();
  });
});
