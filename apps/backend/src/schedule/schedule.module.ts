import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule';
import { ScheduleRepository } from './schedule.repository';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ScheduleController],
  providers: [ScheduleRepository],
})
export class ScheduleModule {}
