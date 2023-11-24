import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Order } from 'src/modules/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field()
  @Column()
  userName!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column('longtext', { nullable: true })
  avatar?: string;

  @Field({ defaultValue: 'member' })
  @Column({ enum: ['admin', 'member'], type: 'enum', default: 'member' })
  role!: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  status!: boolean;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
