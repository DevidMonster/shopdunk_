import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // id: number;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column()
  information: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column()
  content: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field({ nullable: true })
  @Column()
  productId: number;

  @Field(() => Product, { description: 'Example field (placeholder)' })
  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  product: Product;
}
