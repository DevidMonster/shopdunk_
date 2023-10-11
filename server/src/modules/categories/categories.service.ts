import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {
  }

  create(createCategoryInput: CreateCategoryInput) {
    const newProduct = this.categoryRepository.create(createCategoryInput);
    return this.categoryRepository.save(newProduct);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const product = await this.categoryRepository.findOneBy({id: id});
    if(!product){
      throw new Error(`Category #${id} not found`);
    }
    return product;
    // return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category : { id:number, name: string , slug: string} = await this.categoryRepository.findOneBy({ id: id });
    if (!category) {
      throw new Error(`Category #${id} not found`);
    }
    console.log("category", updateCategoryInput.name);
    if(category){
      category.slug = slugify(updateCategoryInput.name);
    }
    await this.categoryRepository.update(id, updateCategoryInput);
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    await this.categoryRepository.delete(id);
    return {
      message: `deleted ${id} category`,
      id: id
    };
  }
}
