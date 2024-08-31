import {
  Customers,
  Measures,
  MeasureStatus,
  MeasureType,
} from '@prisma/client';
import { Readable } from 'stream';

export const file: Express.Multer.File = {
  fieldname: 'image',
  originalname: 'gas_meter_1.png',
  encoding: '7bit',
  mimetype: 'image/png',
  path: '/tmp/gas_meter_1.png',
  size: 646137,
  buffer: Buffer.from('/tmp/gas_meter_1.png'),
  filename: 'gas_meter_1',
  destination: '/tmp/gas_meter_1.png',
  stream: Readable['from'](['/tmp/gas_meter_1.png']),
};

export const customers: Customers[] = [
  {
    id: '99626079-7ef9-474e-ab86-561abb581656',
    code: 'AA00011234',
    name: 'Ariana Grande',
    createdAt: new Date('2023-06-12T15:53:00.000Z'),
    updatedAt: new Date('2023-06-12T15:53:00.000Z'),
    deletedAt: null,
  },
  {
    id: '1713a53d-49c9-41cc-907a-ad9eec96d66e',
    code: 'AA00111234',
    name: 'Lady Gaga',
    createdAt: new Date('2023-03-06T11:00:00.000Z'),
    updatedAt: new Date('2023-03-06T11:00:00.000Z'),
    deletedAt: null,
  },
  {
    id: '1713a53d-49c9-41cc-907a-ad9eec96d66e',
    code: 'AA00111235',
    name: 'Dua Lipa',
    createdAt: new Date('2023-01-02T11:00:00.000Z'),
    updatedAt: new Date('2023-01-02T11:00:00.000Z'),
    deletedAt: null,
  },
];

export const customerAndMeasures = {
  id: '99626079-7ef9-474e-ab86-561abb581656',
  code: 'AA00011234',
  name: 'Ariana Grande',
  createdAt: new Date('2023-06-12T15:53:00.000Z'),
  updatedAt: new Date('2023-06-12T15:53:00.000Z'),
  deletedAt: null,
  Measures: [
    {
      id: '0cee2842-8236-4d20-a857-36b35fdca7b8',
      imageUri: '',
      value: 351,
      consumptionDate: new Date('2022-03-06T11:00:00.000Z'),
      status: MeasureStatus.PENDING_APPROVAL,
      type: MeasureType.WATER,
      createdAt: new Date('2022-03-06T15:53:00.000Z'),
      updatedAt: new Date('2022-03-06T11:00:00.000Z'),
      deletedAt: null,
      customersId: '99626079-7ef9-474e-ab86-561abb581656',
    },
    {
      id: 'fa54affa-551d-4d13-bb44-f64b0561c2b1',
      imageUri: '',
      value: 231,
      consumptionDate: new Date('2022-03-06T11:00:00.000Z'),
      status: MeasureStatus.PENDING_APPROVAL,
      type: MeasureType.GAS,
      createdAt: new Date('2022-03-06T11:00:00.000Z'),
      updatedAt: new Date('2022-03-06T11:00:00.000Z'),
      deletedAt: null,
      customersId: '99626079-7ef9-474e-ab86-561abb581656',
    },
    {
      id: '74cf6a71-8a18-4e95-bdf5-73e75ca890c9',
      imageUri: '',
      value: 45,
      consumptionDate: new Date('2022-03-06T11:00:00.000Z'),
      status: MeasureStatus.APPROVED,
      type: MeasureType.WATER,
      createdAt: new Date('2022-03-06T11:00:00.000Z'),
      updatedAt: new Date('2022-03-06T11:00:00.000Z'),
      deletedAt: null,
      customersId: '99626079-7ef9-474e-ab86-561abb581656',
    },
  ],
};

export const geminiUploadResponse = {
  image_url: '',
  measure_value: 351,
};

export const customerWithoutMeasures = {
  id: '99626079-7ef9-474e-ab86-561abb581656',
  code: 'AA00011234',
  name: 'Ariana Grande',
  createdAt: new Date('2023-06-12T15:53:00.000Z'),
  updatedAt: new Date('2023-06-12T15:53:00.000Z'),
  deletedAt: null,
  Measures: [],
};

export const measures: Measures[] = [
  {
    id: '0cee2842-8236-4d20-a857-36b35fdca7b8',
    imageUri: '',
    value: 351,
    consumptionDate: new Date('2022-03-06T11:00:00.000Z'),
    status: MeasureStatus.PENDING_APPROVAL,
    type: MeasureType.WATER,
    createdAt: new Date('2022-03-06T15:53:00.000Z'),
    updatedAt: new Date('2022-03-06T11:00:00.000Z'),
    deletedAt: null,
    customersId: '99626079-7ef9-474e-ab86-561abb581656',
  },
  {
    id: 'fa54affa-551d-4d13-bb44-f64b0561c2b1',
    imageUri: '',
    value: 231,
    consumptionDate: new Date('2022-03-06T11:00:00.000Z'),
    status: MeasureStatus.PENDING_APPROVAL,
    type: MeasureType.GAS,
    createdAt: new Date('2022-03-06T11:00:00.000Z'),
    updatedAt: new Date('2022-03-06T11:00:00.000Z'),
    deletedAt: null,
    customersId: '99626079-7ef9-474e-ab86-561abb581656',
  },
  {
    id: '74cf6a71-8a18-4e95-bdf5-73e75ca890c9',
    imageUri: '',
    value: 45,
    consumptionDate: new Date('2022-03-06T11:00:00.000Z'),
    status: MeasureStatus.PENDING_APPROVAL,
    type: MeasureType.WATER,
    createdAt: new Date('2022-03-06T11:00:00.000Z'),
    updatedAt: new Date('2022-03-06T11:00:00.000Z'),
    deletedAt: null,
    customersId: '99626079-7ef9-474e-ab86-561abb581656',
  },
  {
    id: '5e17039b-5f3c-48af-8c69-92cd11d1844f',
    imageUri: '',
    value: 1536,
    consumptionDate: new Date('2022-03-06T11:00:00.000Z'),
    status: MeasureStatus.PENDING_APPROVAL,
    type: MeasureType.WATER,
    createdAt: new Date('2022-03-06T11:00:00.000Z'),
    updatedAt: new Date('2022-03-06T11:00:00.000Z'),
    deletedAt: null,
    customersId: '1713a53d-49c9-41cc-907a-ad9eec96d66e',
  },
];
