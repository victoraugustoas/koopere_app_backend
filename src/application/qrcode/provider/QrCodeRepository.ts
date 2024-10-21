import { Result } from '../../common/base/Result';
import { Pageable, PageableResponse } from '../../common/types/Pageable';
import { QrCode } from '../model/QrCode';

export abstract class QrCodeRepository {
  abstract findAll(
    pagination: Pageable,
  ): Promise<Result<PageableResponse<QrCode[]>>>;

  abstract create(qr: QrCode): Promise<Result<void>>;
}
