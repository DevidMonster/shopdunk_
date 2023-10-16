import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductSkusService } from './product_skus.service';
import { ProductSkus } from './entities/product_skus.entity';
import { CreateProductSkusInput } from './dto/create-product_skus.input';
// import { UpdateProductSkusInput } from './dto/update-product_skus.input';

@Resolver(() => ProductSkus)
export class ProductSkusResolver {
  constructor(private readonly productSkusService: ProductSkusService) {}

  @Mutation(() => ProductSkus)
  createProductSkus(
    @Args('createProductSkusInput')
    createProductSkusInput: CreateProductSkusInput,
  ) {
    return this.productSkusService.create(createProductSkusInput);
  }

  @Query(() => [ProductSkus], { name: 'productSkus' })
  findAll() {
    return this.productSkusService.findAll();
  }

  @Query(() => ProductSkus, { name: 'productSkus' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productSkusService.findOne(id);
  }

  // @Mutation(() => ProductSkus)
  // updateProductSkus(
  //   @Args('updateProductSkusInput')
  //   updateProductSkusInput: UpdateProductSkusInput,
  // ) {
  //   return this.productSkusService.update(
  //     updateProductSkusInput.id,
  //     updateProductSkusInput,
  //   );
  // }

  // @Mutation(() => ProductSkus)
  // removeProductSkus(@Args('id', { type: () => Int }) id: number) {
  //   return this.productSkusService.remove(id);
  // }
}
