import { Module } from '@nestjs/common';
import { QrCodeModule } from './modules/qrcode/qrcode.module';

@Module({
  imports: [QrCodeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
