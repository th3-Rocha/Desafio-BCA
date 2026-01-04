import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from './health-response.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @HttpCode(200)
  @ApiOperation({ summary: 'Health check da API' })
  @Get()
  @ApiOkResponse({
    description: 'Health check response',
    type: HealthResponseDto,
  })
  checkHealth(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
