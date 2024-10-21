import { Module } from '@nestjs/common';
import { QrCodeRepository } from '../../../application/qrcode/provider/QrCodeRepository';
import { MemoryQrCodeRepository } from './provider/MemoryQrCodeRepository';
import { QrCodeController } from './qrcode.controller';

@Module({
  imports: [],
  controllers: [QrCodeController],
  providers: [{ provide: QrCodeRepository, useClass: MemoryQrCodeRepository }],
})
export class QrCodeModule {}
