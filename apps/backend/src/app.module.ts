import { Module } from '@nestjs/common';

import { DbModule } from './db/db.module';
import { ServiceModule } from './service/service.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [DbModule, ServiceModule, ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
