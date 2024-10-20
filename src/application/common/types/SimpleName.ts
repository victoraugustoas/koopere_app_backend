import { Result } from '../base/Result';
import { VO, VOConfig } from '../base/ValueObject';

export class SimpleName extends VO<string, VOConfig> {
  private constructor(name: string, cfg?: VOConfig) {
    super(name, cfg);
  }

  static new(
    name: string,
    min: number,
    max: number,
    cfg?: VOConfig,
  ): Result<SimpleName> {
    const { atr, cls } = cfg ?? {};

    const nameLenght = name.length;
    const lessThan = nameLenght < min ? 'minimum_characters_not_reached' : null;
    const biggerThan =
      nameLenght > max ? 'maximum_characters_not_allowed' : null;

    const error = lessThan || biggerThan;

    return error
      ? Result.fail({ type: error, value: name, atr, cls })
      : Result.ok(new SimpleName(name));
  }
}
