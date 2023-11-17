import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductImage } from '../product_images/entities/product_image.entity';
import { Option } from 'src/modules/options/entities/option.entity';
import { OptionValue } from 'src/modules/option_values/entities/option_value.entity';
import { ProductSkus } from 'src/modules/product_skus/entities/product_skus.entity';
import { SkuValue } from 'src/modules/sku_values/entities/sku_value.entity';
import { OptionsService } from 'src/modules/options/options.service';
import { Product } from './entities/product.entity';
import { OptionValuesService } from 'src/modules/option_values/option_values.service';
import { ProductSkusService } from 'src/modules/product_skus/product_skus.service';
import { SkuValuesService } from 'src/modules/sku_values/sku_values.service';
import { Category } from '../categories/entities/category.entity';
import { ProductImagesService } from '../product_images/product_images.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      Option,
      OptionValue,
      ProductSkus,
      SkuValue,
      Category,
      User,
    ]),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    ProductSkusService,
    OptionsService,
    OptionValuesService,
    SkuValuesService,
    ProductImagesService,
  ],
})
export class ProductsModule {}
