import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SkuValuesService } from './sku_values.service';
import { SkuValue } from './entities/sku_value.entity';
import { CreateSkuValueInput } from './dto/create-sku_value.input';
// import { UpdateSkuValueInput } from './dto/update-sku_value.input';

@Resolver(() => SkuValue)
export class SkuValuesResolver {
  constructor(private readonly skuValuesService: SkuValuesService) {}

  @Mutation(() => SkuValue)
  createSkuValue(
    @Args('createSkuValueInput') createSkuValueInput: CreateSkuValueInput,
  ) {
    return this.skuValuesService.create(createSkuValueInput);
  }

  @Query(() => [SkuValue], { name: 'skuValues' })
  findAll() {
    return this.skuValuesService.findAll();
  }

  @Query(() => SkuValue, { name: 'skuValue' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.skuValuesService.findOne(id);
  }

  // @Mutation(() => SkuValue)
  // updateSkuValue(@Args('updateSkuValueInput') updateSkuValueInput: UpdateSkuValueInput) {
  //   return this.skuValuesService.update(updateSkuValueInput.id, updateSkuValueInput);
  // }

  // @Mutation(() => SkuValue)
  // removeSkuValue(@Args('id', { type: () => Int }) id: number) {
  //   return this.skuValuesService.remove(id);
  // }
}
