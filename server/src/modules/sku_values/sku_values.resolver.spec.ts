import { Test, TestingModule } from '@nestjs/testing';
import { SkuValuesResolver } from './sku_values.resolver';
import { SkuValuesService } from './sku_values.service';

describe('SkuValuesResolver', () => {
  let resolver: SkuValuesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkuValuesResolver, SkuValuesService],
    }).compile();

    resolver = module.get<SkuValuesResolver>(SkuValuesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
