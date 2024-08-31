import { MeasureStatus, MeasureType } from '@prisma/client';
import {
  IsBase64,
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
} from 'class-validator';

export class UploadMeasureFormDto {
  @IsString()
  customer_code: string;

  @IsDateString()
  measure_datetime: string;

  @IsEnum(MeasureType)
  measure_type: MeasureType;
}

export class UploadMeasureResponse {
  @IsString()
  image_url: string;

  @IsInt()
  measure_value: number;

  @IsString()
  measure_uuid: string;
}

export class UploadMeasureDto extends UploadMeasureFormDto {
  @IsBase64()
  image: string;
}

export class ConfirmMeasureDto {
  @IsString()
  measure_uuid: string;

  @IsInt()
  confirmed_value: number;
}

export interface CreateMeasure {
  value: number;
  imageUri: string;
  type: MeasureType;
  status: MeasureStatus;
  consumptionDate: string;
  customersId: string;
}

export interface UpdateMeasure {
  value?: number;
  imageUri?: string;
  type?: MeasureType;
  status?: MeasureStatus;
  consumptionDate?: string;
}
