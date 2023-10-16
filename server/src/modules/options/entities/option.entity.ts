import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OptionValue } from 'src/modules/option_values/entities/option_value.entity';
import { Product } from 'src/modules/products/entities/product.entity';
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
export class Option {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field()
  @Column()
  optionName: string;

  @Field(() => [OptionValue])
  @OneToMany(() => OptionValue, (optionValue) => optionValue.option , { cascade: true })
  optionValues: OptionValue[];

  @Field(() => [SkuValue])
  @OneToMany(() => SkuValue, (skuValue) => skuValue.option , { cascade: true })
  skuValues: SkuValue[];
}
