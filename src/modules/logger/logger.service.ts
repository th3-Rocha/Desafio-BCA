import { Injectable, Logger, Optional, Scope } from '@nestjs/common';
import { ILogger } from './logger.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements ILogger {
  private logger: Logger;
  constructor(@Optional() context?: string) {
    this.logger = new Logger(context || 'Application');
  }

  log(context: string, message: string): void {
    this.logger.log(`[${context}] ${message}`);
  }

  error(context: string, message: string, trace?: string): void {
    this.logger.error(`[${context}] ${message}`, trace);
  }

  warn(context: string, message: string): void {
    this.logger.warn(`[${context}] ${message}`);
  }
}
