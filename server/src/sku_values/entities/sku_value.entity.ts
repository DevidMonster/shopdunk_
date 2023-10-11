import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OptionValue } from 'src/option_values/entities/option_value.entity';
import { Option } from 'src/options/entities/option.entity';
import { ProductSkus } from 'src/product_skus/entities/product_skus.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class SkuValue {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => ProductSkus)
  @ManyToOne(() => ProductSkus, (ProductSkus) => ProductSkus.skuValues)
  @JoinColumn({ name: 'skuId' })
  sku: ProductSkus;

  @Field(() => Option)
  @ManyToOne(() => Option, (option) => option.skuValues)
  @JoinColumn({ name: 'optionId' })
  option: Option;

  @Field(() => OptionValue)
  @ManyToOne(() => OptionValue, (optionValue) => optionValue.skuValues)
  @JoinColumn({ name: 'valueId' })
  optionValue: OptionValue;
}
