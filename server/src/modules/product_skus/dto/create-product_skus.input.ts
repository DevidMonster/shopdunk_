import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductSkusInput {
  @Field({ nullable: true })
  productId?: number;

  @Field()
  sku: string;

  @Field(() => Int, { defaultValue: 0 })
  price: number;

  @Field(() => [String], { defaultValue: [] })
  images?: string[];

  @Field()
  quantity: number;

  @Field()
  status: boolean;

  @Field()
  sku_name?: string;
}
