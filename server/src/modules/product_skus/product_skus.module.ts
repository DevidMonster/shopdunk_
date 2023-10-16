import { Module } from '@nestjs/common';
import { ProductSkusService } from './product_skus.service';
import { ProductSkusResolver } from './product_skus.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductImage } from '../product_images/entities/product_image.entity';
import { ProductSkus } from './entities/product_skus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, ProductSkus])],
  providers: [ProductSkusResolver, ProductSkusService],
  exports: [ProductSkusService],
})
export class ProductSkusModule {}
