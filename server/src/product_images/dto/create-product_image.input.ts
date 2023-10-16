import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductImageInput {
  @Field()
  url: string;

  @Field(() => Int, { nullable: true })
  producId: number;

  @Field(() => Int, { nullable: true })
  producSkuId: number;
}
