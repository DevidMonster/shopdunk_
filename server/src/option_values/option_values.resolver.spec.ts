import { Test, TestingModule } from '@nestjs/testing';
import { OptionValuesResolver } from './option_values.resolver';
import { OptionValuesService } from './option_values.service';

describe('OptionValuesResolver', () => {
  let resolver: OptionValuesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionValuesResolver, OptionValuesService],
    }).compile();

    resolver = module.get<OptionValuesResolver>(OptionValuesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
