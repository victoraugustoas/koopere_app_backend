import { Module } from '@nestjs/common';
import { databaseProviders } from './datasourceProvider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
