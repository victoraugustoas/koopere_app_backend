import { Result } from '../../common/base/Result';
import { UseCase } from '../../common/base/Usecase';
import { QrCode, QrCodeProps } from '../model/QrCode';
import { QrCodeRepository } from '../provider/QrCodeRepository';

interface IN extends QrCodeProps {}
type OUT = void;

export class CreateQrCode implements UseCase<IN, OUT> {
  constructor(private readonly qrCodeRepo: QrCodeRepository) {}

  async execute(value: IN): Promise<Result<OUT>> {
    const qrCode = QrCode.new(value);
    if (qrCode.wentWrong) return qrCode.asFail;

    const createdQrCode = await this.qrCodeRepo.create(qrCode.instance);
    if (createdQrCode.wentWrong) return createdQrCode.asFail;

    return Result.ok<OUT>();
  }
}
