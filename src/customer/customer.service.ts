import { HttpException, Injectable } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer.repository';
import {
  CreateCustomerDto,
  CustomerCodeListParams,
  CustomerCodeListQuery,
} from './dto';
import { MeasureStatus } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.create(createCustomerDto);
  }

  async getUserMeasures(
    params: CustomerCodeListParams,
    query: CustomerCodeListQuery,
  ) {
    const user = await this.customerRepository.getUserMeasures(
      params.customerCode,
      query.measure_type,
    );

    if (!user) {
      throw new HttpException(
        {
          message: ['Usuário não encontrado'],
          error: 'COSTUMER_NOT_FOUND',
          statusCode: 404,
        },
        404,
      );
    }

    if (user.Measures.length === 0) {
      throw new HttpException(
        {
          message: ['Nenhuma leitura encontrada'],
          error: 'MEASURES_NOT_FOUND',
          statusCode: 404,
        },
        404,
      );
    }

    return {
      customer_code: user.code,
      measures: user.Measures.map((measure) => {
        return {
          measure_uuid: measure.id,
          measure_datetime: measure.consumptionDate,
          measure_type: measure.type,
          has_confirmed: measure.status === MeasureStatus.APPROVED,
          image_url: measure.imageUri,
        };
      }),
    };
  }
}
