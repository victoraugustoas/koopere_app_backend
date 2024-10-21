import { Module } from '@nestjs/common';
import { QrCodeRepository } from '../../../application/qrcode/provider/QrCodeRepository';
import { TypeOrmQrCodeRepository } from './provider/TypeOrmQrCodeRepository';
import { QrCodeController } from './qrcode.controller';
import { CommonsModule } from '../../common/commons.module';

@Module({
  imports: [CommonsModule],
  controllers: [QrCodeController],
  providers: [{ provide: QrCodeRepository, useClass: TypeOrmQrCodeRepository }],
})
export class QrCodeModule {}
