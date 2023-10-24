import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ProductImage } from 'src/modules/product_images/entities/product_image.entity';
import { Option } from 'src/modules/options/entities/option.entity';
import { ProductSkus } from 'src/modules/product_skus/entities/product_skus.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from 'src/modules/categories/entities/category.entity';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('longtext')
  description: string;

  @Field(() => Int)
  @Column({ type: 'float', default: 0 })
  price: number;

  @Field(() => [ProductImage])
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    nullable: true,
  })
  images?: ProductImage[];

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;

  @Field(() => [Option])
  @OneToMany(() => Option, (option) => option.product)
  options?: Option[];

  @Field(() => [ProductSkus])
  @OneToMany(() => ProductSkus, (productSkus) => productSkus.product, {
    cascade: true,
    nullable: true,
  })
  productSkus?: ProductSkus[];

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
