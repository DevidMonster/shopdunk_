import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/modules/products/entities/product.entity';
import {
  BeforeInsert,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
@ObjectType()
export class Comment {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // id: number;
  @Field(() => Int, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { description: 'Họ và tên' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Email hoặc số điện thoại' })
  @Column()
  information: string;

  @Field(() => String, { description: 'Nội dung bình luận' })
  @Column()
  content: string;

  @Field(() => [Comment], { nullable: true })
  @TreeChildren({
    cascade: true,
  })
  children: Comment[];

  @Field(() => Comment, { nullable: true })
  @TreeParent({
    onDelete: 'CASCADE',
  })
  parent_comment: Comment;

  @TreeLevelColumn()
  level: number;

  @Field(() => Date, { description: 'Thời gian bình luận' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field({ nullable: true })
  @Column()
  productId: number;

  @Field(() => Product, { description: 'Example field (placeholder)' })
  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  product: Product;

  @BeforeInsert()
  updateLevel(): void {
    if (this.parent_comment) {
      if (this.parent_comment.parent_comment !== null) {
        this.level = this.parent_comment.level + 1;
        // if (this.level >= 2) {
        //   this.level = 2;
        //   this.parent_comment = this.parent_comment.parent_comment;
        // }
      } else {
        this.parent_comment = null;
      }
    } else {
      this.level = 0;
    }
  }
}
