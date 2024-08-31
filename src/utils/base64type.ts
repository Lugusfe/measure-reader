import { HttpException } from '@nestjs/common';

interface Base64TypeResponse {
  extension: string;
  mimeType: string;
}

export function base64type(base64: string): Base64TypeResponse {
  switch (base64.charAt(0)) {
    case '/':
      return {
        extension: '.jpg',
        mimeType: 'image/jpeg',
      };
    case 'i':
      return {
        extension: '.png',
        mimeType: 'image/png',
      };
    case 'U':
      return {
        extension: '.webp',
        mimeType: 'image/webp',
      };

    default:
      throw new HttpException(
        {
          message: ['O formato da imagem deve ser PNG, JPG ou WEBP'],
          error: 'INVALID_IMAGE_FORMAT',
          statusCode: 400,
        },
        400,
      );
  }
}
