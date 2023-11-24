import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Branch {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  code: number;

  @Field()
  @Column()
  provinceCode: number;

  @Field()
  @Column()
  branchName: string;

  @Field()
  @Column()
  address: string;
}
