import { Id, IdProps } from './Id';
import { Result } from './Result';

export interface EntityProps {
  id: IdProps;
}

export abstract class Entity<Type, Props extends EntityProps> {
  constructor(
    readonly id: Id,
    readonly props: Props,
  ) { }

  abstract copyWith(props: Partial<Props>): Result<Type>;
}
