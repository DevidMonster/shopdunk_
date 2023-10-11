import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OptionValue } from 'src/option_values/entities/option_value.entity';
import { Product } from 'src/products/entities/product.entity';
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
export class Option {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.options)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field()
  @Column()
  optionName: string;

  @Field(() => [OptionValue])
  @OneToMany(() => OptionValue, (optionValue) => optionValue.option)
  optionValues: OptionValue[];

  @Field(() => [SkuValue])
  @OneToMany(() => SkuValue, (skuValue) => skuValue.option)
  skuValues: SkuValue[];
}
