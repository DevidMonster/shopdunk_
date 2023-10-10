import { Module } from '@nestjs/common';
import { SkuValuesService } from './sku_values.service';
import { SkuValuesResolver } from './sku_values.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductSkus } from 'src/product_skus/entities/product_skus.entity';
import { OptionValue } from 'src/option_values/entities/option_value.entity';
import { Option } from 'src/options/entities/option.entity';
import { ProductSkusService } from 'src/product_skus/product_skus.service';
import { SkuValue } from './entities/sku_value.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductSkus,
      Option,
      OptionValue,
      SkuValue,
    ]),
  ],
  providers: [SkuValuesResolver, SkuValuesService, ProductSkusService],
  exports: [SkuValuesService],
})
export class SkuValuesModule {}
