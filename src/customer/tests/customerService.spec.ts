import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../customer.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomerRepository } from '../repositories/customer.repository';
import {
  customerAndMeasures,
  customers,
  customerWithoutMeasures,
} from './mocks';
import { HttpException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, CustomerRepository, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be create a user', async () => {
    prisma.customers.create = jest.fn().mockReturnValue(customers[0]);

    const customer = await service.create({
      code: 'AA00001234',
      name: 'John Doe',
    });

    expect(customers).toContain(customer);
  });

  it('Should be get a user and you measures', async () => {
    const customerCode = 'AA00011234';
    prisma.customers.findFirst = jest.fn().mockReturnValue(customerAndMeasures);

    const customer = await service.getUserMeasures(
      {
        customerCode,
      },
      {
        measure_type: undefined,
      },
    );

    expect(customer.measures).toHaveLength(3);
    expect(customer.customer_code).toBe(customerCode);
  });

  it('Should not find a user', async () => {
    const customerCode = 'AA00000000';
    prisma.customers.findFirst = jest.fn().mockReturnValue(null);

    try {
      await service.getUserMeasures(
        {
          customerCode: customerCode,
        },
        {
          measure_type: undefined,
        },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(JSON.stringify(error.getResponse())).toBe(
        JSON.stringify({
          message: ['Usuário não encontrado'],
          error: 'COSTUMER_NOT_FOUND',
          statusCode: 404,
        }),
      );
    }
  });

  it('Should not find measures for a user', async () => {
    const customerCode = 'AA00000000';
    prisma.customers.findFirst = jest
      .fn()
      .mockReturnValue(customerWithoutMeasures);

    try {
      const response = await service.getUserMeasures(
        {
          customerCode: customerCode,
        },
        {
          measure_type: undefined,
        },
      );
      expect(response.measures).toHaveLength(0);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(JSON.stringify(error.getResponse())).toBe(
        JSON.stringify({
          message: ['Nenhuma leitura encontrada'],
          error: 'MEASURES_NOT_FOUND',
          statusCode: 404,
        }),
      );
    }
  });
});
