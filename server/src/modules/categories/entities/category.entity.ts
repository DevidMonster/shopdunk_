import { ObjectType, Field, Int } from '@nestjs/graphql';
import slugify from 'slugify';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
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

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, { lower: true });
  }

}
