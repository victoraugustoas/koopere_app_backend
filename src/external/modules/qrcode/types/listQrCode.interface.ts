import {
  Pageable,
  PageableResponse,
} from '../../../../application/common/types/Pageable';
import { QrCodeDTO } from '../dtos/qrcode.dto';

export interface ListQrCodeRequest extends Partial<Pageable> {}

export interface ListQrCodeResponse extends PageableResponse<QrCodeDTO[]> {}
