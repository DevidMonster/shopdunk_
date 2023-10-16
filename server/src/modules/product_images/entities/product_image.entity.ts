import { ProductSkus } from 'src/modules/product_skus/entities/product_skus.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ProductImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field()
  @Column()
  imageUrl: string;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @Field(() => ProductSkus)
  @ManyToOne(() => ProductSkus, (ProductSkus) => ProductSkus.images, {
    nullable: true,
  })
  productSkus: ProductSkus;
}
