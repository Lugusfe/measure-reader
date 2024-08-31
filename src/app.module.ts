import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasureAnalysisModule } from './measure-analysis/measure-analysis.module';
import { PrismaModule } from './prisma/prisma.module';
import { GeminiModule } from './gemini/gemini.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [MeasureAnalysisModule, PrismaModule, GeminiModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
