import { Module } from '@nestjs/common';
import { QrCodeModule } from './modules/qrcode/qrcode.module';
import { CommonsModule } from './common/commons.module';

@Module({
  imports: [CommonsModule, QrCodeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
