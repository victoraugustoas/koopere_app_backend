import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialConfig1729543479002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'qrcode',
        columns: [
          { name: 'id', type: 'uuid' },
          { name: 'name', type: 'varchar', length: '50' },
          { name: 'value', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(
      new Table({
        name: 'qrcode',
        columns: [
          { name: 'id', type: 'uuid' },
          { name: 'name', type: 'varchar', length: '50' },
          { name: 'value', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
    await queryRunner.dropTable(new Table({ name: 'qrcode' }));
  }
}
