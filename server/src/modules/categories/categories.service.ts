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
  ) {}

  async create(categoryNew: CreateCategoryInput): Promise<Category> { 
    if (categoryNew.parentId) {
      const parent = await this.categoryRepository.findOne({ where: { id: categoryNew.parentId } });
      const newCategory = await this.categoryRepository.create({
        name: categoryNew.name,
        parent: parent,
      });
      return this.categoryRepository.save(newCategory);
    }
  }

  async findAll() {
    return this.categoryRepository.findTrees();
  }

  async getCategoryHierarchy(category: Category) {
    // const children = await categories.filter((c) => c.parent.id === category.id);
    // if (children.length === 0) {
    //   return category;
    // }
    // category.children = children;
    // children.forEach((c) => this.getCategoryHierarchy(c, categories));
    // return category;
    const children = await this.categoryRepository.find({
      where: { parent: category === null ?  null  : { id: category.id }},
      relations: ['children'],
    })
    
    if(children.length === 0) {
      return [category]
    }

    let result: Category[] = [category];
    for(const child of children) {
      const childHierarchy = await this.getCategoryHierarchy(child);
      result = result.concat(childHierarchy);
    }

    return result;
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
    const category = await this.categoryRepository.findOne({ where: { id: id } });

    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }

    await this.categoryRepository.softRemove(category);
  }
}
