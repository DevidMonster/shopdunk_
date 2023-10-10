import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSkuValueInput {
  @Field(() => Int)
  optionId: number;

  @Field(() => Int)
  valueId: number;

  @Field(() => Int)
  skuId: number;
}
