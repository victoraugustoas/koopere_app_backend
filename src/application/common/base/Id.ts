import { Result } from './Result';
import { VO, VOConfig } from './ValueObject';

export interface IdProps extends VOConfig {
  value?: string;
}

export class Id extends VO<string, IdProps> {
  constructor(props: IdProps, cfg?: VOConfig) {
    // TODO change this to uuid
    super(props.value ?? '', cfg);
  }

  static new(props: IdProps, cfg?: VOConfig): Result<Id> {
    return Result.ok(new Id(props, cfg));
  }
}
