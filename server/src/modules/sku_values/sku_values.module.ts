import { Module } from '@nestjs/common';
import { SkuValuesService } from './sku_values.service';
import { SkuValuesResolver } from './sku_values.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductSkus } from 'src/modules/product_skus/entities/product_skus.entity';
import { OptionValue } from 'src/modules/option_values/entities/option_value.entity';
import { Option } from 'src/modules/options/entities/option.entity';
import { ProductSkusService } from 'src/modules/product_skus/product_skus.service';
import { SkuValue } from './entities/sku_value.entity';
import { ProductImage } from '../product_images/entities/product_image.entity';
import { ProductImagesService } from '../product_images/product_images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductSkus,
      Option,
      OptionValue,
      ProductImage,
      SkuValue,
    ]),
  ],
  providers: [
    SkuValuesResolver,
    SkuValuesService,
    ProductSkusService,
    ProductImagesService,
  ],
  exports: [SkuValuesService],
})
export class SkuValuesModule {}
