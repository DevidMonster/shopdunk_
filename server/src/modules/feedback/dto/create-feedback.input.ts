import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFeedbackInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  nameUser: string;

  @Field(() => Number, { description: 'Example field (placeholder)' })
  rate: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  content: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  image: string;

  @Field(() => Number, { description: 'Example field (placeholder)' })
  productId: number;
}
