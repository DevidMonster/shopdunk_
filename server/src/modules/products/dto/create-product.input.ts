import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateOptionInput } from 'src/modules/options/dto/create-option.input';
import { CreateProductSkusInput } from 'src/modules/product_skus/dto/create-product_skus.input';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int, { defaultValue: 0 })
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  discount: number;

  @Field(() => [String], { defaultValue: [] })
  images?: string[];

  @Field(() => [CreateOptionInput])
  options: CreateOptionInput[];

  @Field(() => [CreateProductSkusInput])
  skuValues: CreateProductSkusInput[];
}
