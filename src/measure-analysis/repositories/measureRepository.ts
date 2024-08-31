import { PrismaService } from '../../prisma/prisma.service';
import { CreateMeasure, UpdateMeasure } from '../dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MeasureRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateMeasure) {
    const response = await this.prismaService.measures.create({
      data: {
        value: body.value,
        imageUri: body.imageUri,
        type: body.type,
        status: body.status,
        consumptionDate: body.consumptionDate,
        customersId: body.customersId,
      },
    });

    return response;
  }

  async getById(measureId: string) {
    const response = await this.prismaService.measures.findUnique({
      where: {
        id: measureId,
      },
    });

    return response;
  }

  async update(measureId: string, data: UpdateMeasure) {
    const response = await this.prismaService.measures.update({
      where: {
        id: measureId,
      },
      data,
    });

    return response;
  }
}
