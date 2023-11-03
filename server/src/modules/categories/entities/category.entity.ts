import { ObjectType, Field, Int } from '@nestjs/graphql';
import slugify from 'slugify';
import { Product } from 'src/modules/products/entities/product.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('nested-set')
@ObjectType()
export class Category {
  [x: string]: any;

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  slug: string;

  @TreeChildren({
    cascade: true,
  })
  @Field(() => [Category], { nullable: true })
  children: Category[];

  @TreeParent({
    onDelete: 'CASCADE',
  })
  @Field(() => Category, { nullable: true })
  parent: Category;

  // @Field()
  // @DeleteDateColumn()
  // deletedAt: Date;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  // @ManyToOne(() => Category, (parent) => parent.children, { nullable: true })
  // @Field(() => Category, { nullable: true })
  // parent: Category;

  // @OneToMany(() => Category, (child) => child.parent)
  // // @Field(() => [Category], { nullable: true })
  // children: Category[];

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, { lower: true });
  }
}
