import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'qrcode' })
export class QrCodeEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  createdAt: Date;
  @Column({ length: 50 })
  name: string;
  @Column()
  value: string;
}
