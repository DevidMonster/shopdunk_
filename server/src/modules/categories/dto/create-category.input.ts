import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import slugify from 'slugify';
import { BeforeInsert } from 'typeorm';

@InputType()
export class CreateCategoryInput {

  @Field(() => String)
  name?: string;

  @Field(() => Int, { nullable: true }) 
  parentId?: number;
}
