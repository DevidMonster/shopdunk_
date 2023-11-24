import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateBranchInput {
  @Field(() => Int)
  code: number;

  @Field(() => Int)
  provinceCode: number;

  @Field()
  branchName: string;

  @Field()
  address: string;
}
