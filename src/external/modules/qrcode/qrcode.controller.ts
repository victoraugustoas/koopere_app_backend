import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { QrCodeRepository } from '../../../application/qrcode/provider/QrCodeRepository';
import { CreateQrCode } from '../../../application/qrcode/usecases/CreateQrCode';
import { ListQrCodes } from '../../../application/qrcode/usecases/ListQrCodes';
import { QrCodeMapperDTO } from './dtos/qrcode.dto';
import { CreateQrCodeRequest } from './types/createQrCode.interface';
import {
  ListQrCodeRequest,
  ListQrCodeResponse,
} from './types/listQrCode.interface';

@Controller('qrcode')
export class QrCodeController {
  constructor(private readonly qrCodeRepo: QrCodeRepository) {}

  @Get()
  async findAll(
    @Query() query: ListQrCodeRequest,
  ): Promise<ListQrCodeResponse> {
    const useCase = new ListQrCodes(this.qrCodeRepo);
    const result = await useCase.execute({
      limit: query.limit ?? 10,
      page: query.page ?? 0,
    });
    if (result.itWorked) {
      const mappedResult = result.instance.data.map((qrcode) =>
        QrCodeMapperDTO.mapper(qrcode).toJSON(),
      );
      return { ...result.instance, data: mappedResult };
    } else {
      // TODO format http error
      result.throwErrorIfError();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createQrCodeReq: CreateQrCodeRequest) {
    const useCase = new CreateQrCode(this.qrCodeRepo);

    const result = await useCase.execute({
      createdAt: new Date(),
      name: createQrCodeReq.name,
      value: createQrCodeReq.value,
      id: { value: undefined },
    });
    if (result.itWorked) {
      return;
    } else {
      // TODO format http error
      result.throwErrorIfError();
    }
  }
}
