import { Module } from '@nestjs/common';
import { ProductSkusService } from './product_skus.service';
import { ProductSkusResolver } from './product_skus.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductImage } from '../product_images/entities/product_image.entity';
import { ProductSkus } from './entities/product_skus.entity';
import { SkuValue } from '../sku_values/entities/sku_value.entity';
import { SkuValuesService } from '../sku_values/sku_values.service';
import { OptionsService } from '../options/options.service';
import { Option } from '../options/entities/option.entity';
import { OptionValue } from '../option_values/entities/option_value.entity';
import { OptionValuesService } from '../option_values/option_values.service';
import { ProductImagesService } from '../product_images/product_images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      ProductSkus,
      SkuValue,
      Option,
      OptionValue,
    ]),
  ],
  providers: [
    ProductSkusResolver,
    ProductSkusService,
    SkuValuesService,
    OptionsService,
    OptionValuesService,
    ProductImagesService,
  ],
  exports: [ProductSkusService],
})
export class ProductSkusModule { }
