import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UploadInput {
  @Field()
  path: string;

  @Field()
  originalname: string;
}
