import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ErrorDTO } from '../../common/errors/error.dto';
import { QrCodeModule } from './qrcode.module';
import { CreateQrCodeRequest } from './types/createQrCode.interface';

describe('QrCodeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [QrCodeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/qrcode (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/qrcode?limit=10&page=0')
      .expect(200)
      .expect({ limit: 10, page: 0, total: 0, data: [] });
  });

  it('should return status 201 created', () => {
    return request(app.getHttpServer())
      .post('/api/qrcode')
      .send({
        name: 'test',
        value: 'https://google.com',
      } as CreateQrCodeRequest)
      .expect(201);
  });

  it('should return an error when the name is longer than 50 characters', () => {
    const name = 'test test test test test test test test test test test';
    return request(app.getHttpServer())
      .post('/api/qrcode')
      .send({
        name,
        value: 'https://google.com',
      } as CreateQrCodeRequest)
      .expect(400)
      .expect({
        message: [
          { type: 'maximum_characters_not_allowed', value: name } as ErrorDTO,
        ],
        statusCode: 400,
        error: 'Bad Request',
      });
  });
});
