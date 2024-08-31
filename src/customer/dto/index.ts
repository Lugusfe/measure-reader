import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { MeasureType } from '@prisma/client';

export class CreateCustomerDto {
  @IsString()
  name?: string;

  @IsString()
  code: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class CustomerCodeListParams {
  @IsString()
  customerCode: string;
}

export class CustomerCodeListQuery {
  @IsOptional()
  @IsEnum(MeasureType)
  measure_type?: MeasureType;
}
