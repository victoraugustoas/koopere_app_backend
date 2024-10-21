import { Controller, Get, Query } from '@nestjs/common';
import { QrCodeRepository } from '../../../application/qrcode/provider/QrCodeRepository';
import { ListQrCodes } from '../../../application/qrcode/usecases/ListQrCodes';

@Controller('qrcode')
export class QrCodeController {
  constructor(private readonly qrCodeRepo: QrCodeRepository) {}

  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    const useCase = new ListQrCodes(this.qrCodeRepo);
    const result = await useCase.execute({
      limit: limit ?? 10,
      page: page ?? 0,
    });
    if (result.itWorked) {
      return result.instance;
    } else {
      // TODO format http error
      result.throwErrorIfError();
    }
  }
}
