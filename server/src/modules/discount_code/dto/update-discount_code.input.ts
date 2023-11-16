import { CreateDiscountCodeInput } from './create-discount_code.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDiscountCodeInput extends PartialType(CreateDiscountCodeInput) {
  @Field(() => Int)
  id: number;
}
