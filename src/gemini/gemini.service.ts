import { HttpException, Injectable } from '@nestjs/common';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiUploadImageRequest } from './dto';
import { MeasureType } from '@prisma/client';

@Injectable()
export class GeminiService {
  private fileManager: GoogleAIFileManager;
  private Gemini: GoogleGenerativeAI;
  private GeminiModel: GenerativeModel;

  constructor() {
    this.fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
    this.Gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.GeminiModel = this.Gemini.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });
  }

  async uploadImage(file: GeminiUploadImageRequest, registerType: MeasureType) {
    try {
      const uploadResponse = await this.fileManager.uploadFile(
        '/tmp/' + file.originalname,
        {
          mimeType: file.mimetype,
          displayName: 'bill',
        },
      );

      const result = await this.GeminiModel.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          },
        },
        {
          //text: `Please analyze the attached image of a domestic gas meter and extract the current reading displayed on the meter. The reading should include all digits shown, including any decimals if present. Provide the result as a int and return on key consumption of json, usually the meter have 8 digits, 5 in black and 3 and red.`,
          text: `Collect the number of consumption of the ${registerType.toString().toLowerCase()} meter and return on key consumption of json (The meter usually have 8 digits, 5 in black and 3 and red)`,
        },
      ]);

      const response = JSON.parse(result.response.text());

      return {
        image_url: uploadResponse.file.uri,
        measure_value: Math.floor(Number(response.consumption)),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          message: [
            'The image identification service is experiencing intermittency, please try again later :(',
          ],
          error: 'AI_UNAVAILABLE',
          statusCode: 400,
        },
        400,
      );
    }
  }
}
