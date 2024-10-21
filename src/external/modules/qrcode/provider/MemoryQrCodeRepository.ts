import { Result } from '../../../../application/common/base/Result';
import {
  Pageable,
  PageableResponse,
} from '../../../../application/common/types/Pageable';
import { QrCode } from '../../../../application/qrcode/model/QrCode';
import { QrCodeRepository } from '../../../../application/qrcode/provider/QrCodeRepository';

export class MemoryQrCodeRepository implements QrCodeRepository {
  qrCodes: QrCode[] = [];

  async findAll(
    pagination: Pageable,
  ): Promise<Result<PageableResponse<QrCode[]>>> {
    const start = pagination.page * pagination.limit;
    const end = start + pagination.limit;

    const qrCodes = this.qrCodes.slice(start, end);

    const result: PageableResponse<QrCode[]> = {
      total: this.qrCodes.length,
      data: qrCodes,
      page: pagination.page,
    };

    return Result.ok(result);
  }

  async create(qr: QrCode): Promise<Result<void>> {
    this.qrCodes.push(qr);

    return Result.ok();
  }
}
