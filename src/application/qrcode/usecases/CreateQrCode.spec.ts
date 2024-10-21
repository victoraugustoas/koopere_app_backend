import { MemoryQrCodeRepository } from '../../../external/modules/qrcode/provider/MemoryQrCodeRepository';
import { CreateQrCode } from './CreateQrCode';

test('should create a QR code', async () => {
  const repo = new MemoryQrCodeRepository();
  const usecase = new CreateQrCode(repo);

  const result = await usecase.execute({
    id: { value: undefined },
    createdAt: new Date(),
    name: 'Teste',
    value: 'https://google.com',
  });

  expect(result.itWorked).toBe(true);
  expect(repo.qrCodes.at(0).name.value).toBe('Teste');
});

test('should throw an error when creating with a long name', async () => {
  const repo = new MemoryQrCodeRepository();
  const usecase = new CreateQrCode(repo);

  const result = await usecase.execute({
    id: { value: undefined },
    createdAt: new Date(),
    name: 'Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste',
    value: 'https://google.com',
  });

  expect(result.itWorked).toBe(false);
  expect(result.wentWrong).toBe(true);
  expect(result.errors.at(0).type).toBe('maximum_characters_not_allowed');
  expect(repo.qrCodes.length).toBe(0);
});

test('should throw an error when creating with a short name', async () => {
  const repo = new MemoryQrCodeRepository();
  const usecase = new CreateQrCode(repo);

  const result = await usecase.execute({
    id: { value: undefined },
    createdAt: new Date(),
    name: '',
    value: 'https://google.com',
  });

  expect(result.itWorked).toBe(false);
  expect(result.wentWrong).toBe(true);
  expect(result.errors.at(0).type).toBe('minimum_characters_not_reached');
  expect(repo.qrCodes.length).toBe(0);
});
