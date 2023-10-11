import { InputType, Field } from '@nestjs/graphql';
import { CreateOptionValueInput } from 'src/option_values/dto/create-option_value.input';

@InputType()
export class CreateOptionInput {
  @Field({ nullable: true })
  productId?: number;

  @Field()
  optionName: string;

  @Field(() => [CreateOptionValueInput])
  optionValues: CreateOptionValueInput[];
}
