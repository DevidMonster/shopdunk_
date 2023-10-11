import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductImage } from 'src/product_images/entities/product_image.entity';
import { Option } from 'src/options/entities/option.entity';
import { OptionValue } from 'src/option_values/entities/option_value.entity';
import { ProductSkus } from 'src/product_skus/entities/product_skus.entity';
import { SkuValue } from 'src/sku_values/entities/sku_value.entity';
import { OptionsService } from 'src/options/options.service';
import { Product } from './entities/product.entity';
import { OptionValuesService } from 'src/option_values/option_values.service';
import { ProductSkusService } from 'src/product_skus/product_skus.service';
import { SkuValuesService } from 'src/sku_values/sku_values.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      Option,
      OptionValue,
      ProductSkus,
      SkuValue,
    ]),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    ProductSkusService,
    OptionsService,
    OptionValuesService,
    SkuValuesService,
  ],
})
export class ProductsModule {}
