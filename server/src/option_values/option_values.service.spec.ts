import { Test, TestingModule } from '@nestjs/testing';
import { OptionValuesService } from './option_values.service';

describe('OptionValuesService', () => {
  let service: OptionValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionValuesService],
    }).compile();

    service = module.get<OptionValuesService>(OptionValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
