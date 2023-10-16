import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Option } from 'src/modules/options/entities/option.entity';
import { SkuValue } from 'src/modules/sku_values/entities/sku_value.entity';
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
  @ManyToOne(() => Option, (option) => option.optionValues, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'optionId' })
  option: Option;

  @Field()
  @Column()
  valueName: string;

  @Field(() => [SkuValue])
  @OneToMany(() => SkuValue, (skuValues) => skuValues.optionValue, { cascade: true })
  skuValues: SkuValue[];
}
