import { CreateSkuValueInput } from './create-sku_value.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSkuValueInput extends PartialType(CreateSkuValueInput) {
  @Field(() => Int)
  id: number;
}
