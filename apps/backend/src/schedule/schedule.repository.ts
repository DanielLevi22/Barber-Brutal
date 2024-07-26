import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import {
  Schedule,
  ScheduleRepository as ScheduleRepositoryCore,
} from '@barber/core';

@Injectable()
export class ScheduleRepository implements ScheduleRepositoryCore {
  constructor(private prismaService: PrismaService) {}

  async create(schedule: Schedule): Promise<void> {
    await this.prismaService.schedule.create({
      data: {
        clientEmail: schedule.clientEmail,
        date: schedule.date,
        professional: { connect: { id: schedule.professional.id } },
        services: {
          connect: schedule.services.map((service) => ({ id: service.id })),
        },
      },
    });
  }

  async findByEmail(email: string): Promise<Schedule[]> {
    return this.prismaService.schedule.findMany({
      where: {
        clientEmail: email,
        date: {
          gte: new Date(),
        },
      },
      include: {
        services: true,
        professional: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findByProfessional(
    professionalId: number,
    date: Date,
  ): Promise<Schedule[]> {
    const year = date.getFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const startOfDay = new Date(year, month, day, 0, 0, 0);
    const endOfDay = new Date(year, month, day, 23, 59, 59);

    return this.prismaService.schedule.findMany({
      where: {
        professionalId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: { services: true, professional: true },
    });
  }
}
