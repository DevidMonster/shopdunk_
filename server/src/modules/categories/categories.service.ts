import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Repository, TreeRepository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: TreeRepository<Category>,
    @InjectRepository(Product)
    private product: TreeRepository<Product>,
  ) {}

  async create(categoryNew: CreateCategoryInput): Promise<Category> {
    const parent = await this.categoryRepository.findOne({
      where: { id: categoryNew.parentId },
    });
    const newCategory = this.categoryRepository.create({
      name: categoryNew.name,
      parent: parent || null,
    });
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return this.categoryRepository.findTrees({
      relations: ['products', 'products.images'],
    });
  }

  async findOne(id: number) {
    const product = await this.categoryRepository.findOne({
      where: { id: id },
      relations: { products: { images: true } },
    });

    if (!product) {
      throw new Error(`Category #${id} not found`);
    }
    return product;
    // return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.categoryRepository.findOneBy({ id: id });

    if (!category) {
      throw new Error(`Category #${id} not found`);
    }

    if (category) {
      category.slug = slugify(updateCategoryInput.name);
      category.name = updateCategoryInput.name;
      if (updateCategoryInput.parentId) {
        const parent = await this.categoryRepository.findOne({
          where: { id: updateCategoryInput.parentId },
        });
        category.parent = parent
      }
    }

    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
      relations: {
        products: true,
        children: true,
      },
    });

    const defaultCategory = await this.categoryRepository.findOne({
      where: { parent: null },
    });

    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }

    await this.updateCateOfProduct(category.products, defaultCategory);

    await this.mapingCategoryToProduct(category.children, defaultCategory);

    await this.categoryRepository.remove(category);
    return category;
  }

  async mapingCategoryToProduct(
    categories: Category[],
    defaultCategory: Category,
  ) {
    for (const category of categories) {
      const cate = await this.categoryRepository.findOne({
        where: { id: category.id },
        relations: {
          products: true,
          children: true,
        },
      });
      await this.updateCateOfProduct(cate.products, defaultCategory);

      await this.mapingCategoryToProduct(cate.children, defaultCategory);
    }
  }

  async updateCateOfProduct(products: Product[], category: Category) {
    for (const product of products) {
      const prd = await this.product.findOne({ where: { id: product.id } });
      prd.category = category;
      await this.product.save(prd);
    }
  }
}
