import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class ResponseProduct {
  @Field(() => [Product])
  data: Product[];

  @Field()
  currentPage: number;

  @Field()
  totalPages: number;

  @Field()
  pageSize: number;
}
