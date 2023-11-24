import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from 'src/modules/order_details/entities/order_detail.entity';
import { ProductSkus } from 'src/modules/product_skus/entities/product_skus.entity';
import { OrderDetailsService } from 'src/modules/order_details/order_details.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, ProductSkus, User])],
  providers: [OrdersResolver, OrdersService, OrderDetailsService],
})
export class OrdersModule {}
