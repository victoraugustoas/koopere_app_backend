import { v4 as uuidv4 } from 'uuid';
import { Result } from './Result';
import { VO, VOConfig } from './ValueObject';

export interface IdProps extends VOConfig {
  value?: string;
}

export class Id extends VO<string, IdProps> {
  constructor(props: IdProps, cfg?: VOConfig) {
    super(props.value ?? uuidv4(), cfg);
  }

  static new(props: IdProps, cfg?: VOConfig): Result<Id> {
    return Result.ok(new Id(props, cfg));
  }
}
