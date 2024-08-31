import { Module } from '@nestjs/common';
import { MeasureAnalysisService } from './measure-analysis.service';
import { MeasureAnalysisController } from './measure-analysis.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GeminiModule } from '../gemini/gemini.module';
import { CustomerRepository } from '../customer/repositories/customer.repository';
import { MeasureRepository } from './repositories/measureRepository';

@Module({
  imports: [PrismaModule, GeminiModule],
  providers: [MeasureAnalysisService, MeasureRepository, CustomerRepository],
  controllers: [MeasureAnalysisController],
})
export class MeasureAnalysisModule {}
