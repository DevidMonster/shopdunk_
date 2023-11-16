import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateDiscountCodeInput {
  @Field()
  code: string;

  @Field(() => Int)
  discountPercent: number;
}
