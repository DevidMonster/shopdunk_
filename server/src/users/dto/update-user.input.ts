import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean, IsEmail } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  userName?: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  @IsString()
  phoneNumber?: string;

  @Field()
  @IsString()
  address?: string;

  @Field()
  @IsString()
  avatar?: string;

  @Field()
  @IsString()
  role?: string;

  @Field()
  @IsBoolean()
  status?: boolean;
}
