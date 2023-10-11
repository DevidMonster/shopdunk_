import { Test, TestingModule } from '@nestjs/testing';
import { SkuValuesService } from './sku_values.service';

describe('SkuValuesService', () => {
  let service: SkuValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkuValuesService],
    }).compile();

    service = module.get<SkuValuesService>(SkuValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
