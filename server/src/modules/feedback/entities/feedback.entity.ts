import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Feedback {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column()
  nameUser: string;

  @Field(() => Number, { description: 'Example field (placeholder)' })
  @Column()
  rate: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column()
  content: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column()
  image: string;

  @Field(() => Number, { description: 'Example field (placeholder)' })
  @Column()
  productId: number;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => Product, { description: 'Example field (placeholder)' })
  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  product: Product;
}
