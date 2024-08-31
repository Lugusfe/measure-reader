import { HttpException, Injectable } from '@nestjs/common';
import {
  ConfirmMeasureDto,
  UploadMeasureFormDto,
  UploadMeasureDto,
  UploadMeasureResponse,
} from './dto';
import { GeminiService } from '../gemini/gemini.service';
import * as fs from 'fs';
import { base64type } from '../utils/base64type';
import { MeasureRepository } from './repositories/measureRepository';
import { Measures, MeasureStatus } from '@prisma/client';
import { CustomerRepository } from '../customer/repositories/customer.repository';

@Injectable()
export class MeasureAnalysisService {
  private Gemini: GeminiService;
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly customerRepository: CustomerRepository,
  ) {
    this.Gemini = new GeminiService();
  }

  async uploadMeasureForm(
    file: Express.Multer.File,
    body: UploadMeasureFormDto,
  ): Promise<UploadMeasureResponse> {
    const user = await this.customerRepository.findOrCreate(body.customer_code);

    await this.checkDoubleMeasure(user.Measures, body);

    fs.writeFileSync('/tmp/' + file.originalname, file.buffer);

    const gemini = await this.Gemini.uploadImage(
      {
        originalname: file.originalname,
        mimetype: file.mimetype,
      },
      body.measure_type,
    );

    const measure = await this.measureRepository.create({
      value: gemini.measure_value,
      imageUri: gemini.image_url,
      type: body.measure_type,
      status: MeasureStatus.PENDING_APPROVAL,
      consumptionDate: body.measure_datetime,
      customersId: user.id,
    });

    return {
      image_url: gemini.image_url,
      measure_value: measure.value,
      measure_uuid: measure.id,
    };
  }

  async uploadMeasure(body: UploadMeasureDto): Promise<UploadMeasureResponse> {
    const user = await this.customerRepository.findOrCreate(body.customer_code);

    await this.checkDoubleMeasure(user.Measures, body);

    const imageType = base64type(body.image);

    fs.writeFileSync(
      '/tmp/measure' + imageType.extension,
      body.image,
      'base64',
    );

    const gemini = await this.Gemini.uploadImage(
      {
        originalname: 'measure' + imageType.extension,
        mimetype: imageType.mimeType,
      },
      body.measure_type,
    );

    const measure = await this.measureRepository.create({
      value: gemini.measure_value,
      imageUri: gemini.image_url,
      type: body.measure_type,
      status: MeasureStatus.PENDING_APPROVAL,
      consumptionDate: body.measure_datetime,
      customersId: user.id,
    });

    return {
      image_url: gemini.image_url,
      measure_value: measure.value,
      measure_uuid: measure.id,
    };
  }

  async measureConfirm(body: ConfirmMeasureDto) {
    const measure = await this.measureRepository.getById(body.measure_uuid);

    if (!measure) {
      throw new HttpException(
        {
          message: ['Essa leitura não foi encontrada'],
          error: 'MEASURE_NOT_FOUND',
          statusCode: 404,
        },
        404,
      );
    }

    if (measure.status === MeasureStatus.APPROVED) {
      throw new HttpException(
        {
          message: ['Leitura do mês já realizada'],
          error: 'CONFIRMATION_DUPLICATE',
          statusCode: 409,
        },
        409,
      );
    }

    await this.measureRepository.update(body.measure_uuid, {
      value: body.confirmed_value,
      status: MeasureStatus.APPROVED,
    });

    return {
      success: true,
    };
  }

  private async checkDoubleMeasure(
    measures: Measures[],
    body: UploadMeasureFormDto,
  ) {
    const bodyDate = new Date(body.measure_datetime);

    const similarMeasure = measures.filter((measureItem) => {
      const measureItemDate = measureItem.consumptionDate;

      return (
        measureItemDate.getMonth() === bodyDate.getMonth() &&
        measureItemDate.getFullYear() === bodyDate.getFullYear() &&
        measureItem.type === body.measure_type &&
        measureItem.status !== MeasureStatus.REPROVED
      );
    });

    if (similarMeasure.length) {
      throw new HttpException(
        {
          message: ['Leitura do mês já realizada'],
          error: 'DOUBLE_REPORT',
          statusCode: 409,
        },
        409,
      );
    }
  }
}
