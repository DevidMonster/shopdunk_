import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@ObjectType()
export class ResponseCategory extends PartialType(Category) {
  @Field()
  currentPage: number;

  @Field()
  totalPages: number;

  @Field()
  pageSize: number;
}
