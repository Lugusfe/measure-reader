import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface ApplicationException {
  response?: {
    message: string[] | string;
    error: string;
    statusCode: number;
  };
  status: number;
  message: string;
  name: string;
}

@Catch(HttpException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let details: ApplicationException;

    if (typeof exception === 'object') {
      details = <ApplicationException>JSON.parse(JSON.stringify(exception));
    }

    if (
      details.response.message &&
      typeof details.response.message !== 'string'
    ) {
      details.response.message = details.response.message?.join(', ');
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorStatus = details.status || 500;
    response.status(errorStatus).json({
      error_code: details.response.error || errorStatus,
      error_description: details.response.message || details.message,
    });
  }
}
