import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
import { SkuValue } from 'src/sku_values/entities/sku_value.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class OptionValue {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => Option)
  @ManyToOne(() => Option, (option) => option.optionValues)
  @JoinColumn({ name: 'optionId' })
  option: Option;

  @Field()
  @Column()
  valueName: string;

  @Field(() => [SkuValue])
  @OneToMany(() => SkuValue, (skuValues) => skuValues.optionValue)
  skuValues: SkuValue[];
}
