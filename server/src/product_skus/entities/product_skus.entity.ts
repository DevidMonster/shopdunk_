import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ProductImage } from 'src/product_images/entities/product_image.entity';
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
export class ProductSkus {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field()
  @Column({ nullable: true })
  sku: string;

  @Field(() => Int)
  @Column({ type: 'float', default: 0 })
  price: number;

  @Field(() => [ProductImage])
  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @Field(() => Int)
  @Column({ default: 0 })
  quantity: number;

  @Field(() => [SkuValue])
  @OneToMany(() => SkuValue, (skuValue) => skuValue.sku)
  skuValues: SkuValue[];

  @Field()
  @Column({ type: 'boolean', default: false })
  status: boolean;
}
