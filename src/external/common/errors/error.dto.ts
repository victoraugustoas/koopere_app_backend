import { Error } from '../../../application/common/base/Error';

export interface ErrorDTO {
  type: string;
  value: string;
}

// TODO crete abstract class mapper dto
export class ErrorMapperDTO {
  private constructor(readonly data: ErrorDTO) {}

  static mapper(error: Error): ErrorMapperDTO {
    return new ErrorMapperDTO({
      type: error.type,
      value: error.value,
    });
  }

  toJSON(): ErrorDTO {
    return this.data;
  }
}
