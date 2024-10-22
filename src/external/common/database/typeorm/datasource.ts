import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { QrCodeEntity } from './entities/qrcode.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  entities: [QrCodeEntity],
  migrations: [`./migrations/*.ts`],
  migrationsTableName: 'koopere_migration_table',
});
