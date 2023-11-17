import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RemoveBannerOutput {
  @Field()
  message: string;
}
