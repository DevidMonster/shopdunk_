import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DiscountCodeService } from './discount_code.service';
import { DiscountCode } from './entities/discount_code.entity';
import { CreateDiscountCodeInput } from './dto/create-discount_code.input';

@Resolver(() => DiscountCode)
export class DiscountCodeResolver {
  constructor(private readonly discountCodeService: DiscountCodeService) {}

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

  @Mutation(() => Boolean)
  async deleteDiscountCode(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.discountCodeService.deleteDiscountCode(id);
  }
}
