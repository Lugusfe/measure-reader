import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  CustomerCodeListParams,
  CustomerCodeListQuery,
} from './dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/customer/create')
  create(@Body(new ValidationPipe()) createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get('/:customerCode/list')
  async getClientMeasures(
    @Param(new ValidationPipe()) params: CustomerCodeListParams,
    @Query(new ValidationPipe()) query?: CustomerCodeListQuery,
  ) {
    return await this.customerService.getUserMeasures(params, query);
  }
}
