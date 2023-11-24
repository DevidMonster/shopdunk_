import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateOrderDetailInput } from 'src/modules/order_details/dto/create-order_detail.input';

@InputType()
export class CreateOrderInput {
  @Field(() => Int, { nullable: true })
  userId: number;

  @Field()
  customerName: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  paymentMethod: string;

  @Field()
  totalAmount: number;

  @Field(() => [CreateOrderDetailInput])
  items: CreateOrderDetailInput[];
}
