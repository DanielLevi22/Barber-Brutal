import { Schedule, FetchBusySchedules } from '@barber/core';
import { ScheduleRepository } from './schedule.repository';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('schedules')
export class ScheduleController {
  constructor(private repo: ScheduleRepository) {}

  @Post()
  criar(@Body() schedule: Schedule) {
    return this.repo.create(schedule);
  }

  @Get(':email')
  buscarPorEmail(@Param('email') email: string) {
    return this.repo.findByEmail(email);
  }

  @Get(':professional/:date')
  FetchBusySchedules(
    @Param('professional') profissional: string,
    @Param('date') dataParam: string,
  ) {
    const casoDeUso = new FetchBusySchedules(this.repo);
    return casoDeUso.execute(+profissional, new Date(dataParam));
  }
}
