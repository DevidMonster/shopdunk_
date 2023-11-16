import { Test, TestingModule } from '@nestjs/testing';
import { DiscountCodeResolver } from './discount_code.resolver';
import { DiscountCodeService } from './discount_code.service';

describe('DiscountCodeResolver', () => {
  let resolver: DiscountCodeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountCodeResolver, DiscountCodeService],
    }).compile();

    resolver = module.get<DiscountCodeResolver>(DiscountCodeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
