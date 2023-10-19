import { CreateOptionValueInput } from './create-option_value.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOptionValueInput extends PartialType(
  CreateOptionValueInput,
) {
  @Field({ nullable: true })
  id?: string;
}
