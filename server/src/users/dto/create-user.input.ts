import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  userName!: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;

  @Field()
  @IsNotEmpty()
  @IsStrongPassword()
  confirmPassword!: string;

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
  role!: string;

  @Field()
  @IsBoolean()
  status!: boolean;
}
