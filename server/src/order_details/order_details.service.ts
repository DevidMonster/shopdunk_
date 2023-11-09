import { Injectable } from '@nestjs/common';
import { CreateOrderDetailInput } from './dto/create-order_detail.input';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
// import { UpdateOrderDetailInput } from './dto/update-order_detail.input';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail) private orderDetail: Repository<OrderDetail>,
    @InjectRepository(Order) private order: Repository<Order>,
  ) {}

  async create(
    orderId: number,
    createOrderDetailInput: CreateOrderDetailInput,
  ) {
    const order = await this.order.findOne({ where: { id: orderId } });

    const orderDetail = this.orderDetail.create({
      order,
      productId: createOrderDetailInput.id,
      image: createOrderDetailInput.image,
      option: createOrderDetailInput.option,
      price: createOrderDetailInput.price,
      productName: createOrderDetailInput.productName,
      quantity: createOrderDetailInput.quantity,
    });

    return await this.orderDetail.save(orderDetail);
  }

  findAll() {
    return `This action returns all orderDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  // update(id: number, updateOrderDetailInput: UpdateOrderDetailInput) {
  //   return `This action updates a #${id} orderDetail`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} orderDetail`;
  // }
}
