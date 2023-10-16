import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOptionValueInput {
  @Field({ nullable: true })
  optionId?: number;

  @Field()
  valueName: string;
}
