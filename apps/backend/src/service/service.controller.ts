import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Controller('service')
export class ServiceController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async getAll() {
    return this.prismaService.service.findMany();
  }
}
