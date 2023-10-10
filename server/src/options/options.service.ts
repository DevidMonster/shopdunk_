import { Injectable } from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { OptionValuesService } from 'src/option_values/option_values.service';
// import { UpdateOptionInput } from './dto/update-option.input';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option) private readonly option: Repository<Option>,
    @InjectRepository(Product) private readonly product: Repository<Product>,
    private readonly optionValueService: OptionValuesService,
  ) {}

  async create(createOptionInput: CreateOptionInput) {
    const product = await this.product.findOne({
      where: { id: createOptionInput.productId },
    });

    const option = this.option.create({
      optionName: createOptionInput.optionName,
      product: product,
    });

    const newOption = await this.option.save(option);

    for (const optionValue of createOptionInput.optionValues) {
      await this.optionValueService.create({
        optionId: newOption.id,
        valueName: optionValue.valueName,
      });
    }

    const result = await this.option.findOne({
      where: { id: newOption.id },
      relations: { optionValues: true },
    });

    return result;
  }

  findAll() {
    return `This action returns all options`;
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  // update(id: number, updateOptionInput: UpdateOptionInput) {
  //   return `This action updates a #${id} option`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} option`;
  // }
}
