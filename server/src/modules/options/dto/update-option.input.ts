import { UpdateOptionValueInput } from 'src/modules/option_values/dto/update-option_value.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOptionInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  productId?: number;

  @Field()
  optionName: string;

  @Field(() => [UpdateOptionValueInput])
  optionValues: UpdateOptionValueInput[];
}
