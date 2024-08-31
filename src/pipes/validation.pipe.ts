import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype as unknown as () => void)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessages = [];
      errors.forEach((error) => {
        Object.entries(error.constraints).forEach((elt) =>
          errorMessages.push(elt[1]),
        );
      });
      throw new BadRequestException(errorMessages, {
        description: 'INVALID_DATA',
      });
    }
    return value;
  }

  private toValidate(metatype: () => void): boolean {
    const types: (() => void)[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
