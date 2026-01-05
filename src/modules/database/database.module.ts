import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DATABASE_SERVICE } from './interfaces/database.interface';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_SERVICE,
      useClass: DatabaseService,
    },
  ],
  exports: [DATABASE_SERVICE],
})
export class DatabaseModule {}
