import { Test, TestingModule } from '@nestjs/testing';
import { ProductSkusResolver } from './product_skus.resolver';
import { ProductSkusService } from './product_skus.service';

describe('ProductSkusResolver', () => {
  let resolver: ProductSkusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSkusResolver, ProductSkusService],
    }).compile();

    resolver = module.get<ProductSkusResolver>(ProductSkusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
