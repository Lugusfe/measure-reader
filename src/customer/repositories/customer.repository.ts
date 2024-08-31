import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from '../dto';
import { MeasureType } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateCustomerDto) {
    const response = await this.prismaService.customers.create({
      data: {
        name: body.name,
        code: body.code,
      },
    });

    return response;
  }

  async getUserMeasures(customerCode: string, measure_type?: MeasureType) {
    const response = await this.prismaService.customers.findFirst({
      where: {
        code: customerCode,
      },
      include: {
        Measures: {
          where: {
            type: measure_type,
          },
        },
      },
    });

    return response;
  }

  async findOrCreate(customerCode: string) {
    const response = await this.prismaService.customers.upsert({
      where: {
        code: customerCode,
      },
      create: {
        code: customerCode,
      },
      update: {
        code: customerCode,
      },
      include: {
        Measures: true,
      },
    });

    return response;
  }
}
