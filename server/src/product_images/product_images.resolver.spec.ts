import { Test, TestingModule } from '@nestjs/testing';
import { ProductImagesResolver } from './product_images.resolver';
import { ProductImagesService } from './product_images.service';

describe('ProductImagesResolver', () => {
  let resolver: ProductImagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductImagesResolver, ProductImagesService],
    }).compile();

    resolver = module.get<ProductImagesResolver>(ProductImagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
