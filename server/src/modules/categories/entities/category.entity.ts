import { ObjectType, Field, Int } from '@nestjs/graphql';
import slugify from 'slugify';
import { BeforeInsert, Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';


@Entity()
@Tree("nested-set")
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  slug: string;

  @TreeChildren()
  @Field(() => [Category], { nullable: true })
  children: Category[];

  @TreeParent()
  @Field(() => Category, { nullable: true })
  parent: Category;

  // @Field()
  @DeleteDateColumn()
  deletedArt : Date;



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
