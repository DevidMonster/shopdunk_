import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsResolver } from './order_details.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { OrderDetail } from './entities/order_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  providers: [OrderDetailsResolver, OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
