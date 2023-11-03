import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { ResponseCategory } from './dto/response-category';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id, undefined, undefined);
  }

  @Query(() => ResponseCategory, { name: 'categorySlug' })
  findOneBySlug(
    @Args('slug') slug: string,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
  ) {
    return this.categoriesService.findOne(
      undefined,
      slug,
      undefined,
      page === null ? 1 : page,
    );
  }

  @Query(() => [Category], { name: 'categoryParent' })
  findOneByParent(@Args('parentId', { type: () => Int }) parentId: number) {
    return this.categoriesService.findOne(undefined, undefined, parentId);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }
}
