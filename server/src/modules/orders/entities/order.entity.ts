import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OrderDetail } from 'src/modules/order_details/entities/order_detail.entity';
import { User } from 'src/users/entities/user.entity';
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

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  customerName: string;

  @Field()
  @Column()
  phoneNumber: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  paymentMethod: string;

  @Field()
  @Column()
  paymentStatus: string;

  @Field()
  @Column()
  totalAmount: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => [OrderDetail])
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
    nullable: true,
  })
  orderDetails: OrderDetail[];

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
