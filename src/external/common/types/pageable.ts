import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class Pageable {
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsInt()
  @Type(() => Number)
  page?: number;
}
