import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';

import { MeasureAnalysisService } from '../measure-analysis.service';
import { MeasureRepository } from '../repositories/measureRepository';
import { GeminiService } from '../../gemini/gemini.service';
import { CustomerRepository } from '../../customer/repositories/customer.repository';

describe('MeasureAnalysisService', () => {
  let service: MeasureAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeasureAnalysisService,
        MeasureRepository,
        CustomerRepository,
        PrismaService,
        GeminiService,
      ],
    }).compile();

    service = module.get<MeasureAnalysisService>(MeasureAnalysisService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
});
