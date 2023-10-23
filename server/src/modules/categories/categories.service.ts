import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Repository, TreeRepository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: TreeRepository<Category>,
  ) { }

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

  async findAllWithNoDefaultCate() {
    const categories = await this.categoryRepository.find({
      relations: {
        parent: true,
      }
    })
    return categories.map((category) => category.parent != null)
  }

  async findAll() {
    return this.categoryRepository.findTrees();
  }

  async findOne(id: number) {
    const product = await this.categoryRepository.findOneBy({ id: id });
    if (!product) {
      throw new Error(`Category #${id} not found`);
    }
    return product;
    // return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category: { id: number; name: string; slug: string } =
      await this.categoryRepository.findOneBy({ id: id });
    if (!category) {
      throw new Error(`Category #${id} not found`);
    }
    console.log('category', updateCategoryInput.name);
    if (category) {
      category.slug = slugify(updateCategoryInput.name);
    }
    await this.categoryRepository.update(id, updateCategoryInput);
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }

    await this.categoryRepository.softRemove(category);
  }
}
