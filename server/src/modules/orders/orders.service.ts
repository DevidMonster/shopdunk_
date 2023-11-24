import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ProductSkus } from 'src/modules/product_skus/entities/product_skus.entity';
import { OrderDetailsService } from 'src/modules/order_details/order_details.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(ProductSkus) private productSkus: Repository<ProductSkus>,
    @InjectRepository(User) private user: Repository<User>,
    private orderDetailService: OrderDetailsService,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const orderValue = {
      user: null,
      address: createOrderInput.address,
      customerName: createOrderInput.customerName,
      email: createOrderInput.email,
      paymentMethod: createOrderInput.paymentMethod,
      paymentStatus: 'Đang chờ xử lý',
      phoneNumber: createOrderInput.phoneNumber,
      status: 'Đang xử lý',
      totalAmount: createOrderInput.totalAmount,
    };
    if (createOrderInput.userId != null && createOrderInput.userId) {
      const user = await this.user.findOne({
        where: { id: createOrderInput.userId },
      });
      orderValue.user = user;
    }
    const order = this.order.create(orderValue);

    for (const item of createOrderInput.items) {
      const productSkus = await this.productSkus.findOne({
        where: { id: item.id },
      });
      if (!productSkus) {
        throw new NotFoundException(
          'Sản phẩm: ' + item.productName + ' không còn tồn tại trong cửa hàng',
        );
      }
      if (
        productSkus.quantity == 0 ||
        productSkus.quantity - item.quantity < 0
      ) {
        throw new HttpException(
          'Sản phẩm: ' +
            item.productName +
            ' đã hết hàng hoặc số lượng còn lại không đủ số lượng',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const newOrder = await this.order.save(order);

    for (const item of createOrderInput.items) {
      const productSkus = await this.productSkus.findOne({
        where: { id: item.id },
      });
      productSkus.quantity = productSkus.quantity - item.quantity;
      await this.productSkus.save(productSkus);
      await this.orderDetailService.create(newOrder.id, item);
    }

    return newOrder;
  }

  async findAll(userId: number | undefined) {
    const option: FindManyOptions<Order> = {
      relations: { orderDetails: true },
    };
    if (userId && userId != null) {
      option.where = {
        user: { id: userId },
      };
    }
    const orders = await this.order.find(option);

    if (!orders) {
      throw new NotFoundException('No order found');
    }

    return orders;
  }

  async findOne(id: number) {
    const order = await this.order.findOne({
      where: { id: id },
      relations: { orderDetails: true },
    });

    if (!order) {
      throw new NotFoundException('No order found');
    }
    return order;
  }

  async update(id: number, updateOrderInput: UpdateOrderInput) {
    const order = await this.order.findOne({
      where: { id: id },
      relations: { orderDetails: true },
    });

    if (!order) {
      throw new NotFoundException('No order found');
    }

    order.paymentStatus = updateOrderInput.paymentStatus;
    order.status = updateOrderInput.status;

    if (updateOrderInput.status === 'Đã hủy') {
      for (const orderDetail of order.orderDetails) {
        const productSkus = await this.productSkus.findOne({
          where: { id: orderDetail.productId },
        });
        productSkus.quantity = orderDetail.quantity + productSkus.quantity;
        await this.productSkus.save(productSkus);
      }
    }

    await this.order.save(order);
  }

  async remove(id: number) {
    const order = await this.order.findOne({
      where: { id: id },
      relations: { orderDetails: true },
    });

    if (!order) {
      throw new NotFoundException('No order found');
    }

    await this.order.delete(order);

    return order;
  }
}
