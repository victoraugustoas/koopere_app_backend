import { QrCode } from '../../../../application/qrcode/model/QrCode';

export interface QrCodeDTO {
  id: string;
  createdAt: Date;
  name: string;
  value: string;
}

// TODO crete abstract class mapper dto
export class QrCodeMapperDTO {
  private constructor(readonly data: QrCodeDTO) {}

  static mapper(qrcode: QrCode): QrCodeMapperDTO {
    return new QrCodeMapperDTO({
      id: qrcode.id.value,
      name: qrcode.name.value,
      createdAt: qrcode.createdAt,
      value: qrcode.value,
    });
  }

  toJSON(): QrCodeDTO {
    return this.data;
  }
}
