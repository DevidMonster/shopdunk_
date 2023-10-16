import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsResolver } from './options.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { OptionValue } from 'src/modules/option_values/entities/option_value.entity';
import { SkuValue } from 'src/modules/sku_values/entities/sku_value.entity';
import { Option } from './entities/option.entity';
import { ProductImage } from 'src/product_images/entities/product_image.entity';
import { OptionValuesService } from 'src/modules/option_values/option_values.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Option,
      Product,
      OptionValue,
      SkuValue,
      ProductImage,
    ]),
  ],
  providers: [OptionsResolver, OptionsService, OptionValuesService],
  exports: [OptionsService],
})
export class OptionsModule {}
