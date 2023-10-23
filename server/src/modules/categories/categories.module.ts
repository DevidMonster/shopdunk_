import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
