import { MemoryQrCodeRepository } from '../../../external/modules/qrcode/provider/MemoryQrCodeRepository';
import { QrCode } from '../model/QrCode';
import { ListQrCodes } from './ListQrCodes';

test('should list QR codes', async () => {
  const repo = new MemoryQrCodeRepository();
  repo.qrCodes = [
    QrCode.new({
      createdAt: new Date(),
      id: { value: '123' },
      name: 'Teste',
      value: 'https://google.com',
    }).instance,
  ];
  const usecase = new ListQrCodes(repo);

  const result = await usecase.execute({ limit: 10, page: 0 });

  expect(result.itWorked).toBe(true);
  expect(result.instance.total).toBe(1);
  expect(result.instance.page).toBe(0);
  expect(result.instance.limit).toBe(10);
  expect(result.instance.data.at(0)).toBeInstanceOf(QrCode);
});
