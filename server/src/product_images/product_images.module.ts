import { Module } from '@nestjs/common';
import { ProductImagesService } from './product_images.service';
import { ProductImagesResolver } from './product_images.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductSkus } from 'src/modules/product_skus/entities/product_skus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSkus])],
  providers: [ProductImagesResolver, ProductImagesService],
})
export class ProductImagesModule {}
