import { Module } from '@nestjs/common';
import { OptionValuesService } from './option_values.service';
import { OptionValuesResolver } from './option_values.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from 'src/modules/options/entities/option.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { SkuValue } from 'src/modules/sku_values/entities/sku_value.entity';
import { OptionValue } from './entities/option_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OptionValue, Option, Product, SkuValue])],
  providers: [OptionValuesResolver, OptionValuesService],
  exports: [OptionValuesService],
})
export class OptionValuesModule {}
