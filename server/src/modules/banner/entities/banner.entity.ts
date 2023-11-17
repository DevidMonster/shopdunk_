import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Banner {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id banner' })
  id: number;

  @Column('longtext')
  @Field(() => String, { description: 'Link ảnh' })
  imageUrl: string;

  @Column()
  @Field(() => String, { description: 'URL trang web' })
  redirectUrl: string;

  @Column()
  @Field(() => Int, { description: 'Banner theo category' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.id)
  @Field(() => Category, { description: 'Category' })
  category: Category;
}
