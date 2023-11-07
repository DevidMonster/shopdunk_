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

  @Field({ nullable: true })
  @IsString()
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsString()
  address?: string;

  @Field({ nullable: true })
  @IsString()
  avatar?: string;

  @Field()
  @IsString()
  role?: string;

  @Field()
  @IsBoolean()
  status?: boolean;
}
