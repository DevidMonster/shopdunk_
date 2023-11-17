import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { FindOptionsWhere, TreeRepository } from 'typeorm';
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

  async findOne(
    id: number | undefined,
    slug: string | undefined,
    parentId: number | undefined,
    page: number = 1,
    pageSize: number = 12,
  ) {
    const whereCloud:
      | FindOptionsWhere<Category>
      | FindOptionsWhere<Category>[] = {};

    if (id) {
      whereCloud.id = id;
    }

    if (slug) {
      whereCloud.slug = slug;
    }

    if (parentId) {
      whereCloud.parent = { id: parentId };
      const categoriesRoot = await this.categoryRepository.find({
        where: whereCloud,
        relations: { products: { images: true } },
      });
      const categories = categoriesRoot.map(async (root) => {
        const category = await this.categoryRepository.findDescendantsTree(
          root,
          {
            relations: ['products', 'products.images'],
          },
        );

        const products = [...category.products];
        if (category?.children) {
          category.children.map((child: Category) =>
            child.products.map((product: Product) => products.push(product)),
          );
          category.products = products;
        }
        return category;
      });

      return categories;
    }

    const categoryRoot = await this.categoryRepository.findOne({
      where: whereCloud,
      relations: { products: { images: true } },
    });

    const category = await this.categoryRepository.findDescendantsTree(
      categoryRoot,
      {
        relations: ['products', 'products.images'],
      },
    );
    const products = [...category.products];

    category.children.map((child: Category) =>
      child.products.map((product: Product) => products.push(product)),
    );

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = products.slice(startIndex, endIndex);

    const totalPages = Math.ceil(products.length / pageSize);

    category.products = pageData;

    if (!category) {
      throw new Error(`Category #${id} not found`);
    }

    const response = {
      ...category,
      currentPage: page,
      totalPages,
      pageSize,
    };

    return response;
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
        category.parent = parent;
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
