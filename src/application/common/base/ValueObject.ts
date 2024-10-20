export interface VOConfig {
  cls?: string;
  atr?: string;
}

export class VO<T, Cfg extends VOConfig> {
  constructor(
    readonly value: T,
    readonly cfg?: Cfg,
  ) {}
}
