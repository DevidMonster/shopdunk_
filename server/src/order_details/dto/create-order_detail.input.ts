import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderDetailInput {
  @Field(() => Int)
  id: number;

  @Field()
  productName: string;

  @Field()
  image: string;

  @Field(() => Int)
  quantity: number;

  @Field()
  option: string;

  @Field(() => Int)
  price: number;
}
