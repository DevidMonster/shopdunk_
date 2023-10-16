import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionValuesService } from './option_values.service';
import { OptionValue } from './entities/option_value.entity';
import { CreateOptionValueInput } from './dto/create-option_value.input';
// import { UpdateOptionValueInput } from './dto/update-option_value.input';

@Resolver(() => OptionValue)
export class OptionValuesResolver {
  constructor(private readonly optionValuesService: OptionValuesService) {}

  @Mutation(() => OptionValue)
  createOptionValue(
    @Args('createOptionValueInput')
    createOptionValueInput: CreateOptionValueInput,
  ) {
    return this.optionValuesService.create(createOptionValueInput);
  }

  @Query(() => [OptionValue], { name: 'optionValues' })
  findAll() {
    return this.optionValuesService.findAll();
  }

  @Query(() => OptionValue, { name: 'optionValue' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.optionValuesService.findOne(id);
  }

  // @Mutation(() => OptionValue)
  // updateOptionValue(@Args('updateOptionValueInput') updateOptionValueInput: UpdateOptionValueInput) {
  //   return this.optionValuesService.update(updateOptionValueInput.id, updateOptionValueInput);
  // }

  // @Mutation(() => OptionValue)
  // removeOptionValue(@Args('id', { type: () => Int }) id: number) {
  //   return this.optionValuesService.remove(id);
  // }
}
