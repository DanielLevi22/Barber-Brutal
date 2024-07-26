import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ServiceController],
  exports: [],
})
export class ServiceModule {}
