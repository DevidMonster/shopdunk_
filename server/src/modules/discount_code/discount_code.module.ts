import { Module } from '@nestjs/common';
import { DiscountCodeService } from './discount_code.service';
import { DiscountCodeResolver } from './discount_code.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCode } from './entities/discount_code.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountCode, User])],
  providers: [DiscountCodeResolver, DiscountCodeService],
})
export class DiscountCodeModule {}
