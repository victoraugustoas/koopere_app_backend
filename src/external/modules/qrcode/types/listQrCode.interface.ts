import { PageableResponse } from '../../../../application/common/types/Pageable';
import { Pageable } from '../../../common/types/pageable';
import { QrCodeDTO } from '../dtos/qrcode.dto';

export class ListQrCodeRequest extends Pageable {}

export interface ListQrCodeResponse extends PageableResponse<QrCodeDTO[]> {}
