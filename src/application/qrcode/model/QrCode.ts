import { Entity, EntityProps } from '../../common/base/Entity';
import { Id, IdProps } from '../../common/base/Id';
import { Result } from '../../common/base/Result';
import { SimpleName } from '../../common/types/SimpleName';

export interface QrCodeProps extends EntityProps {
  id: IdProps;
  createdAt: Date;
  name: string;
  value: string;
}

export class QrCode extends Entity<QrCode, QrCodeProps> {
  private constructor(
    readonly id: Id,
    readonly createdAt: Date,
    readonly name: SimpleName,
    readonly value: string,
    props: QrCodeProps,
  ) {
    super(id, props);
  }

  copyWith(props: Partial<QrCodeProps>): Result<QrCode> {
    return QrCode.new({ ...this.props, ...props });
  }

  static new(props: QrCodeProps): Result<QrCode> {
    const cls = QrCode.constructor.name;

    const name = SimpleName.new(props.name, 1, 50, { cls, atr: 'name' });
    const createAttrs = Result.combine<any>([name]);
    if (createAttrs.wentWrong) return createAttrs.asFail;

    return Result.ok(
      new QrCode(
        Id.new(props.id).instance,
        new Date(),
        name.instance,
        props.value,
        props,
      ),
    );
  }
}
