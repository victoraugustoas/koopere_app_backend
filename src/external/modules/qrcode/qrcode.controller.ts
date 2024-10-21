import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QrCodeRepository } from '../../../application/qrcode/provider/QrCodeRepository';
import { CreateQrCode } from '../../../application/qrcode/usecases/CreateQrCode';
import { ListQrCodes } from '../../../application/qrcode/usecases/ListQrCodes';
import { ErrorMapperDTO } from '../../common/errors/error.dto';
import { QrCodeMapperDTO } from './dtos/qrcode.dto';
import { CreateQrCodeRequest } from './types/createQrCode.interface';
import {
  ListQrCodeRequest,
  ListQrCodeResponse,
} from './types/listQrCode.interface';

@Controller('api/qrcode')
export class QrCodeController {
  constructor(private readonly qrCodeRepo: QrCodeRepository) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
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
      throw new BadRequestException(
        result.errors.map((error) => ErrorMapperDTO.mapper(error).toJSON()),
      );
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
      throw new BadRequestException(
        result.errors.map((error) => ErrorMapperDTO.mapper(error).toJSON()),
      );
    }
  }
}
