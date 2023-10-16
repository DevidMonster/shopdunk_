import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OptionValue } from 'src/modules/option_values/entities/option_value.entity';
import { Option } from 'src/modules/options/entities/option.entity';
import { ProductSkus } from 'src/modules/product_skus/entities/product_skus.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class SkuValue {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => ProductSkus)
  @ManyToOne(() => ProductSkus, (ProductSkus) => ProductSkus.skuValues , { onDelete: 'CASCADE' })
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
