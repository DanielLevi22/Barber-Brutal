import { Module } from '@nestjs/common';

import { DbModule } from './db/db.module';
import { ServiceModule } from './service/service.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [ScheduleModule, ServiceModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
