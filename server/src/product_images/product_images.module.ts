import { Module } from '@nestjs/common';
import { ProductImagesService } from './product_images.service';
import { ProductImagesResolver } from './product_images.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductSkus } from 'src/product_skus/entities/product_skus.entity';
import { ProductImage } from './entities/product_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSkus, ProductImage])],
  providers: [ProductImagesResolver, ProductImagesService],
})
export class ProductImagesModule {}
