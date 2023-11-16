import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@ObjectType()
@Entity()
export class DiscountCode {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  code: string;

  @Field(() => Int)
  @Column()
  discountPercent: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
