import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DiscountCodeService } from './discount_code.service';
import { DiscountCode } from './entities/discount_code.entity';
import { CreateDiscountCodeInput } from './dto/create-discount_code.input';
import {
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { AuthortizationGuard } from 'src/guard/authorization/authorization.guard';
import { Role } from 'src/types/role.enum';

@Resolver(() => DiscountCode)
export class DiscountCodeResolver {
  constructor(private readonly discountCodeService: DiscountCodeService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Mutation(() => DiscountCode)
  async createDiscountCode(
    @Args('createDiscountCodeInput') discountCodeDTO: CreateDiscountCodeInput,
  ): Promise<DiscountCode> {
    return this.discountCodeService.createDiscountCode(discountCodeDTO);
  }

  @Query(() => [DiscountCode])
  async getAllDiscountCodes(): Promise<DiscountCode[]> {
    return this.discountCodeService.getAllDiscountCodes();
  }

  @Query(() => DiscountCode, { nullable: true })
  async getDiscountCodeByCode(
    @Args('code') code: string,
  ): Promise<DiscountCode | undefined> {
    return this.discountCodeService.getDiscountCodeByCode(code);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Mutation(() => Boolean)
  async deleteDiscountCode(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.discountCodeService.deleteDiscountCode(id);
  }
}
