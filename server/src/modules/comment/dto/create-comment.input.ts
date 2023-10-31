import { InputType, Field, Int } from '@nestjs/graphql';
// import { Product } from 'src/modules/products/entities/product.entity';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  information: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  content: string;

  @Field({ nullable: true })
  productId: number;
}
