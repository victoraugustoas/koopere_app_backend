import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Result } from '../../../../application/common/base/Result';
import {
  Pageable,
  PageableResponse,
} from '../../../../application/common/types/Pageable';
import { QrCode } from '../../../../application/qrcode/model/QrCode';
import { QrCodeRepository } from '../../../../application/qrcode/provider/QrCodeRepository';
import { QrCodeEntity } from '../../../common/database/typeorm/entities/qrcode.entity';

export class TypeOrmQrCodeRepository implements QrCodeRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async findAll(
    pagination: Pageable,
  ): Promise<Result<PageableResponse<QrCode[]>>> {
    try {
      const { limit, page } = pagination;
      const [result, total] = await this.dataSource
        .getRepository(QrCodeEntity)
        .findAndCount({
          skip: page * limit,
          take: limit,
        });
      return Result.ok({
        data: result.map(
          (entity) =>
            QrCode.new({
              createdAt: entity.createdAt,
              id: { value: entity.id },
              name: entity.name,
              value: entity.value,
            }).instance,
        ),
        total,
        limit: limit,
        page: page,
      });
    } catch (error) {
      console.log(error);
      return Result.fail(error);
    }
  }

  async create(qr: QrCode): Promise<Result<void>> {
    try {
      const entity = new QrCodeEntity();
      entity.createdAt = qr.createdAt;
      entity.id = qr.id.value;
      entity.name = qr.name.value;
      entity.value = qr.value;
      await this.dataSource.getRepository(QrCodeEntity).save(entity);
      return Result.ok();
    } catch (error) {
      return Result.fail(error);
    }
  }
}
