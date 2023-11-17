import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBannerInput {
  @Field(() => String, { description: 'Link ảnh' })
  imageUrl: string;

  @Field(() => String, { description: 'URL trang web' })
  redirectUrl: string;

  @Field(() => Int, { description: 'Banner theo category' })
  categoryId: number;
}
