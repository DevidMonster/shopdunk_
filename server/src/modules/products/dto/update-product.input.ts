import { UpdateOptionInput } from 'src/modules/options/dto/update-option.input';
import { InputType, Field, Int } from '@nestjs/graphql';
import { UpdateProductSkusInput } from 'src/modules/product_skus/dto/update-product_skus.input';

@InputType()
export class UpdateProductInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int, { defaultValue: 0 })
  price: number;

  @Field(() => [String], { defaultValue: [] })
  images?: string[];

  @Field(() => [UpdateOptionInput])
  options: UpdateOptionInput[];

  @Field(() => [UpdateProductSkusInput])
  skuValues: UpdateProductSkusInput[];
}
