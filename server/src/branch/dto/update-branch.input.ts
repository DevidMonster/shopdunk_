import { CreateBranchInput } from './create-branch.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBranchInput extends PartialType(CreateBranchInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  code: number;

  @Field(() => Int)
  provinceCode: number;

  @Field()
  branchName: string;

  @Field()
  address: string;
}
