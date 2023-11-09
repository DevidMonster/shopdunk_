import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class OrderDetail {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  productId: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Field()
  @Column()
  productName: string;

  @Field()
  @Column('longtext')
  image: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field()
  @Column()
  option: string;

  @Field()
  @Column()
  price: number;
}
