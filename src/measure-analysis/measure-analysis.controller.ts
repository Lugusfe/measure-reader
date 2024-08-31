import {
  Body,
  Controller,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MeasureAnalysisService } from './measure-analysis.service';
import {
  ConfirmMeasureDto,
  UploadMeasureFormDto,
  UploadMeasureDto,
  UploadMeasureResponse,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('')
export class MeasureAnalysisController {
  constructor(private readonly appService: MeasureAnalysisService) {}

  @Post('/upload/form')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMeasureForm(
    @UploadedFile() image: Express.Multer.File,
    @Body(new ValidationPipe()) body: UploadMeasureFormDto,
  ): Promise<UploadMeasureResponse> {
    return await this.appService.uploadMeasureForm(image, body);
  }

  @Post('/upload')
  async uploadMeasure(
    @Body(new ValidationPipe()) body: UploadMeasureDto,
  ): Promise<UploadMeasureResponse> {
    return await this.appService.uploadMeasure(body);
  }

  @Patch('/confirm')
  async confirmMeasure(@Body(new ValidationPipe()) body: ConfirmMeasureDto) {
    return this.appService.measureConfirm(body);
  }
}
