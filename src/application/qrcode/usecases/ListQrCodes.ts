import { Result } from '../../common/base/Result';
import { UseCase } from '../../common/base/Usecase';
import { Pageable, PageableResponse } from '../../common/types/Pageable';
import { QrCode } from '../model/QrCode';
import { QrCodeRepository } from '../provider/QrCodeRepository';

interface IN extends Pageable {}

type OUT = PageableResponse<QrCode[]>;

export class ListQrCodes implements UseCase<IN, OUT> {
  constructor(private readonly qrCodeRepo: QrCodeRepository) {}

  async execute(value: IN): Promise<Result<OUT>> {
    const qrCodes = await this.qrCodeRepo.findAll(value);
    if (qrCodes.wentWrong) return qrCodes.asFail;

    return Result.ok(qrCodes.instance);
  }
}
